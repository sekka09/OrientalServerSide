import { Router } from "express";
import { ObjectId } from "mongodb";
import { Fragrance } from "../schemas/Fragrances.mjs";
import { Contact } from "../schemas/ContactSchema.mjs";
const router = Router()

function ensureAuthenticated(req, res, next) {
   if (req.isAuthenticated()) { 
      if (req.user.access ===true)
       return next();
      else return res.status(500).send("access denied")
   }
   res.redirect('/login');
}

   
        
        router.get('/api/fragrences',(req,res)=>{
            res.cookie("visited","true",{maxage : 300000});
            if(req.query) {
                let products = []
            Fragrance.find(req.query).limit(0).cursor().forEach((product)=>{products.push(product)})
            .then(()=>{res.status(200).send(products)}) 
            .catch((err)=>res.status(400).send(err))
            }
           else{  let products = []
            Fragrance.find().limit(0).cursor().forEach((product)=>{products.push(product)})
            .then(()=>{ res.status(200).send(products)})
            .catch((err)=>res.status(400).send(err))}
            
      
        })
        router.get('/api/fragrences/:id',(req,res)=>{
            console.log(req.cookies)
            try {
                 Fragrance.findOne({_id : new ObjectId(req.params.id)})
                .then((findresult)=>  res.status(200).send(findresult) )
                
             } catch (e) { 
                console.log (e);
             };   
           
             
        })
        
        router.post('/api/fragrences',ensureAuthenticated,async (req,res)=>{
         console.log(req.user)
          const {body} = req;
            console.log(body)
            try {
                const newfragrance = new Fragrance(body);
                await newfragrance.save();
                res.sendStatus(200) ;
                
             } catch (e) { 
                console.log (e);
             };  
           
            
          
        })
        router.patch('/api/fragrences/:id',ensureAuthenticated, (req,res)=>{
        
            const {body} = req;
            console.log(body)
            try {
                 Fragrance.updateOne({_id : new ObjectId(req.params.id)},{$set : body})
                .then((updateresult)=>  res.status(200).send(updateresult) )
                
             } catch (e) {  
                console.log (e);
             };   
           
           
             

          
        })
        router.delete('/api/fragrences/:id',ensureAuthenticated,(req,res)=>{
        
                try {
                 Fragrance.deleteOne({_id : new ObjectId(req.params.id)})
                .then((deleteresult)=>  res.status(200).send(deleteresult) )
                
             } catch (e) { 
                console.log (e);
             };   
           
           
             
        })  
        router.get('/api/Contact',ensureAuthenticated,(req,res)=>{
         let messages = []
         Contact.find().limit(20).cursor().forEach((message)=>{messages.push(message)})
         .then(()=>{ res.status(200).send(messages)})
         .catch((err)=>res.status(400).send(err))
        })
        router.get('/api/Contact/:id',ensureAuthenticated,(req,res)=>{
         console.log(req.cookies)
         try {
            Contact.findOne({_id : new ObjectId(req.params.id)})
             .then((findresult)=>  res.status(200).send(findresult) )
             
          } catch (e) { 
             console.log (e);
          };   
        
          
     })
     
     router.post('/api/Contact',async (req,res)=>{
      console.log(req.user)
       const {body} = req;
         console.log(body)
         try {
             const newContact = new Contact(body);
             await newContact.save();
             res.sendStatus(200) ;
             
          } catch (e) { 
             console.log (e); 
          };  
        
         
       
     })
     router.patch('/api/Contact/:id',ensureAuthenticated, (req,res)=>{
     
         const {body} = req;
         console.log(body)
         try {
            Contact.updateOne({_id : new ObjectId(req.params.id)},{$set : body})
             .then((updateresult)=>  res.status(200).send(updateresult) )
             
          } catch (e) {  
             console.log (e);
          };   
        
        
          

       
     })
     router.delete('/api/Contact/:id',ensureAuthenticated,(req,res)=>{
     
             try {
               Contact.deleteOne({_id : new ObjectId(req.params.id)})
             .then((deleteresult)=>  res.status(200).send(deleteresult) )
             
          } catch (e) { 
             console.log (e);
          };    
        
        
          
     })  




    


export default router