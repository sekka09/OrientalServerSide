import { Router } from "express";
import { ObjectId } from "mongodb";
import { Banner } from "../schemas/BannersSchema.mjs";
import { Shipping } from "../schemas/ShippingSchema.mjs";
const router = Router() 
 
function ensureAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
      if (req.user.access ===true)
       return next(); 
      else return res.status(500).send("access denied")
   } 
   res.redirect('/login');
}  
router.get('/api/Banner',(req,res)=>{ 
 if(req.query) {
                 let banners = []
             Banner.find(req.query).limit(0).cursor().forEach((banner)=>{banners.push(banner)})
             .then(()=>{res.status(200).send(banners)}) 
             .catch((err)=>res.status(400).send(err))
             }
            else{  let banners = [] 
             Banner.find().limit(0).cursor().forEach((banner)=>{banners.push(banner)})
             .then(()=>{ res.status(200).send(banners)})  
             .catch((err)=>res.status(400).send(err))} 
})
router.get('/api/Banner/:id',(req,res)=>{
    try { let banner = Banner.findOne({_id : new ObjectId(req.params.id)})
       res.status(200).send(banner)}
       catch (e) {console.log(e); res.status(400).send(e)} 
  })
  router.post("/api/Banner",ensureAuthenticated,async (req,res)=>{
          let body = req.body;
          let cp = new Banner({
            name : body.name,
            img1: body.img1, 
            img2:body.img2, 
            img3 :body.img3,
            img4 : body.img4
          })
          await cp.save(); 
          console.log('banner set is saved successfully!');
          
          res.status(200).send("banner set is submitted") 
      })
 router.patch("/api/Banner/:id",ensureAuthenticated,async (req,res)=>{
        const {body} = req;
            console.log(body)
            try {    Banner.updateMany({}, { $set: { selected: false } }).then((result) => {
    console.log('Documents updated:', result.modifiedCount);
    Banner.updateOne({_id : new ObjectId(req.params.id)},{$set : body})
                .then((updateresult)=>  res.status(200).send(updateresult) )
            
  
  .catch((error) => {
    console.error('Error updating documents:', error);
  });
             
  });
         } catch (e) {  
                console.log (e);
             };        
    })
    router.delete("/api/Banner/:id",ensureAuthenticated,async (req,res)=>{
        const CP = await Banner.deleteOne({_id : new ObjectId(req.params.id)})
        CP ? res.status(200).send(CP) : res.status(404).send('Banner Set not found not found')
    })
    router.get('/api/Shipping',(req,res)=>{ 
        if(req.query) {
                        let Shippings = []
                    Shipping.find(req.query).limit(0).cursor().forEach((Shipping)=>{Shippings.push(Shipping)})
                    .then(()=>{res.status(200).send(Shippings)}) 
                    .catch((err)=>res.status(400).send(err))
                    }
                   else{  let Shippings = []
                    Shipping.find().limit(0).cursor().forEach((Shipping)=>{Shippings.push(Shipping)})
                    .then(()=>{ res.status(200).send(Shippings)})
                    .catch((err)=>res.status(400).send(err))}
       })
       router.get('/api/Shipping/:id',(req,res)=>{
           try { let Shipping = Shipping.findOne({_id : new ObjectId(req.params.id)})
              res.status(200).send(Shipping)} 
              catch (e) {console.log(e); res.status(400).send(e)} 
         })
         router.post("/api/Shipping",ensureAuthenticated,async (req,res)=>{
                 let body = req.body;
                 let cp = new Shipping({
                     
              willaya : body.willaya, 
              PrixAD:body.PrixAD, 
              PrixB :body.PrixB
                 })
                 await cp.save();
                 console.log('Shipping set is saved successfully!');
                 
                 res.status(200).send("Shipping set is submitted") 
             })
        router.patch("/api/Shipping/:id",ensureAuthenticated,async (req,res)=>{
               const {body} = req;
                   console.log(body)
                   try {
                        Shipping.updateOne({_id : new ObjectId(req.params.id)},{$set : body})
                       .then((updateresult)=>  res.status(200).send(updateresult) )
                       
                    } catch (e) {  
                       console.log (e);
                    };
           })
           router.delete("/api/Shipping/:id",ensureAuthenticated,async (req,res)=>{
               const CP = await Shipping.deleteOne({_id : new ObjectId(req.params.id)})
               CP ? res.status(200).send(CP) : res.status(404).send('Shipping Set not found not found')
           })

export default router;