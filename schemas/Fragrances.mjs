import mongoose from 'mongoose';

const fragranceSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  price: { type: Number, required: true },  
  quantity: { type: Number, required: true }, 
  img1: { type: String, required: true },  
  img2: { type: String, required: true },  
  img3: { type: String, required: true },
  description : { type: String, required: true }, 
  fragrancefamily : {type: String, required: true }     
}, {
  timestamps: true, 
});

export const Fragrance = mongoose.model('Fragrances', fragranceSchema);
 