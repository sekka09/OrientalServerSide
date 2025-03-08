import passport from "passport";
import { application, response, Router } from "express";
import { ObjectId } from "mongodb";
import session from "express-session";
import MongoStore from "connect-mongo";
import '../strategies/local-strategies.mjs';
import { User } from "../schemas/userSchema.mjs";
import bannerrouter from "../Routes/banners.mjs"
import { hashpassword } from "../Middleware/helpers.mjs";
import { Admin } from "../schemas/AdminSchema.mjs";
import fragrancesrouter from '../Routes/fragrances.mjs';
import Orderrouter from "../Routes/Orders.mjs"
const router = Router()

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
 }
 

    
        router.use(session({
            secret : "codenamepizza",
            saveUninitialized : true,
            resave : false,
            cookie : {
                maxage : 60000*60,
                secure:true, // true only in production
                 sameSite: "none"
            },
            store : MongoStore.create({mongoUrl : "mongodb+srv://sekka09:faresabdellah1234@cluster0.gc7g8.mongodb.net/FragranceStore?retryWrites=true&w=majority&appName=Cluster0"})
        }))
        router.use(passport.initialize())
        router.use(passport.session())
        router.post('/api/register',async (request,response)=>{
            const {body}= request;
            body.password = hashpassword(body.password);
           try{
            const newUser = new User(body);
            await newUser.save();
            response.sendStatus(200) }
            
             catch (err){
                response.status(400).send(err);
             }});  
        router.post('/api/login',passport.authenticate('user-local'),(request,response)=>{ response.sendStatus(200) })
        router.post('/api/logout',(request,response)=>{ request.logOut((err)=>{if (err)response.sendStatus(400)
            response.sendStatus(200)
        }) })
        router.get('/api/authcheck',(request,response)=>{ request.user ?response.sendStatus(200): response.status(400).send("not connected")})
        router.get('/api/user',ensureAuthenticated,async (request,response)=>{ 
             const user = await User.findOne({_id : new ObjectId(request.user.id)})
             response.status(200).send(user)
            })
        router.post('/api/cart',ensureAuthenticated,async(request,response)=>{
           
                const  {id,quantity,size}= request.body;
                const item = {id,quantity,size}
                const {cart}= request.session;
                !cart ? request.session.cart = [item] : cart.push(item);
                response.status(201).send(item)
            
        })  
        router.delete('/api/cart',ensureAuthenticated,async(request,response)=>{
           
            const  {id}= request.body;
            let {cart}= request.session; 
            cart = cart.filter(item=>item.id!==id)
            request.session.cart = cart;
            response.status(201).send(cart)
        
    })  
        router.get('/api/cart',ensureAuthenticated,(request,response)=>{
            
             return response.status(200).send(request.session.cart?? []);
        })
        router.post('/api/Admin/register',async (request,response)=>{
            const {body}= request;
            body.password = hashpassword(body.password);
           try{
            const newAdmin = new Admin(body);
            await newAdmin.save();
            response.sendStatus(200) }
            
             catch (err){ 
                response.status(400).send(err);
             }});
        router.post('/api/Admin/login',passport.authenticate("admin-local"),(request,response)=>{ response.sendStatus(200) })
        router.post('/api/Admin/logout',(request,response)=>{ request.logOut((err)=>{if (err)response.sendStatus(400)
            response.sendStatus(200)
        }) })
        router.get('/api/Admin/authcheck',(request,response)=>{if(request.user){  request.user.access ===true ?response.sendStatus(200): response.status(400).send("access denied")}
    else response.status(500).send("not connected")})
        
        router.use(fragrancesrouter)
        router.use(Orderrouter)
        router.use(bannerrouter)





   




    


export default router
