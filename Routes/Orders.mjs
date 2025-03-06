import { response, Router } from "express";
import { Code, ObjectId } from "mongodb";
import '../strategies/local-strategies.mjs'; 
import { User } from "../schemas/userSchema.mjs";
import { Fragrance } from "../schemas/Fragrances.mjs";
import { hashpassword } from "../Middleware/helpers.mjs";
import {Order} from "../schemas/OrdersSchema.mjs"
import { CodePromo } from "../schemas/PromoCodesSchema.mjs";
import { Admin } from "../schemas/AdminSchema.mjs";
const router = Router()

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
 }
    router.get("/api/CodesPromo",(req,res)=>{
        if(req.query) {
            let CodesPromo = []
        CodePromo.find(req.query).limit(20).cursor().forEach((code)=>{CodesPromo.push(code)})
        .then(()=>{res.status(200).send(CodesPromo)}) 
        .catch((err)=>res.status(400).send(err))
        }
       else{
        let CodesPromo = []
        CodePromo.find().limit(20).cursor().forEach((code)=>{CodesPromo.push(code)})
        .then(()=>{ res.status(200).send(CodesPromo)})
        .catch((err)=>res.status(400).send(err))}
    }) 
    router.post("/api/CodesPromo",ensureAuthenticated,async (req,res)=>{
        let body = req.body;
        let cp = new CodePromo({
            code: body.code, 
            sells: 0,
            sellsc : 0,
            reduction :body.reduction, 
            afiliateshare :body.afiliateshare,
        })
        await cp.save();
        console.log('code promo is saved successfully!');
        
        res.status(200).send("code promo is submitted") 
    })
    router.patch("/api/CodesPromo/:id",async (req,res)=>{
        const {body} = req;
            console.log(body)
            try {
                 CodePromo.updateOne({_id : new ObjectId(req.params.id)},{$set : body})
                .then((updateresult)=>  res.status(200).send(updateresult) )
                
             } catch (e) {  
                console.log (e);
             };
    })
    router.delete("/api/CodesPromo/:id",ensureAuthenticated,async (req,res)=>{
        const CP = await CodePromo.deleteOne({_id : new ObjectId(req.params.id)})
        CP ? res.status(200).send(CP) : res.status(404).send('Code Promo not found')
    })
    router.get("/api/Order",ensureAuthenticated,async (req,res)=>{
        if(req.query) {
            let orders = []
        Order.find(req.query).limit(20).cursor().forEach((order)=>{orders.push(order)})
        .then(()=>{res.status(200).send(orders)}) 
        .catch((err)=>res.status(400).send(err))
        }
       else{  let orders = []
        Order.find().limit(20).forEach((order)=>{orders.push(order)})
        .then(()=>{ res.status(200).send(orders)})
        .catch((err)=>res.status(400).send(err))}   
    })
    router.get("/api/Order/:id",ensureAuthenticated,async (req,res)=>{
      
       try { 
       const order = await Order.findOne({_id : new ObjectId(req.params.id)})
        res.status(200).send(order)
       } 
        catch{(err)=>res.status(400).send(err)}
        }
      ) 
    
    router.post("/api/Order", async(req,res)=>{
        let {body}= req;
        console.log(body)
        const newOrder = new Order({
            name : body.name,
            phonenumber : body.phonenumber,
            adresse : body.adresse,
            shipping : body.shipping,
            wilaya : body.wilaya,
            volume : body.volume,
            total : body.total,
            parfum : body.parfum,
            
             
        });
 
     await newOrder.save();
            console.log('Order saved successfully!');
            
            res.status(200).send("Orders submitted") 
         
       
})
router.delete("/api/Order",ensureAuthenticated,async (req,res)=>{
    const order = await Order.deleteOne({_id : new ObjectId(req.body.id)})
    order ? res.status(200).send(order) : res.status(404).send('Order not found')
})
router.patch("/api/Order/:id",ensureAuthenticated,async (req,res)=>{
   
     try {
        Order.updateOne({_id : new ObjectId(req.params.id)},{$set : req.body})
       .then((updateresult)=>  res.status(200).send(updateresult) )
       
    } catch (e) {  
       console.log (e);
    };   

   }
)



 export default router