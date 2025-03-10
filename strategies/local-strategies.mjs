import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../schemas/userSchema.mjs";
import { Admin } from "../schemas/AdminSchema.mjs";
import { ObjectId } from "mongodb";
import { Router } from "express";
import { comparePassword } from "../Middleware/helpers.mjs";
const router = Router()
  
     
            
            passport.serializeUser((model, done) => {
              let user ={ id: model._id, access: model.access }
              done(null,user); // Add role if needed
            });
            
            passport.deserializeUser(async (obj, done) => {
              try {
                const Model = obj.access === true ? Admin : User; // Logic to determine user type
                const user = await Model.findById(obj.id);
                done(null, user);
              } catch (err) {
                done(err);
              }
            });
         



                      passport.use('admin-local',new Strategy ({
                        usernameField: 'name',
                        passwordField: 'password'
                    },async (name,password,done)=>{
                                        try {
                                             let user =  await Admin.findOne({"name" : name})
                                              if (!user){throw new Error("admin not found")}
                                           else if (comparePassword(password,user.password)) {
                                            if (user.access=== true) done(null,user); else throw new Error ("access denied") } 
                                           else  throw new Error ("false credentials")
                                            
                                            
                                        }
                                        catch(err) {
                                            done(err,null)
                                
                                        }
                                  }))
                




    


export default router





