import mongoose from 'mongoose';
const ShippingSchema = new mongoose.Schema({
    willaya: { type: String, required: true },
    PrixAD: { type: Number, required: true }, 
    PrixB : { type: Number, required: true },
});
 
export const Shipping = mongoose.model('Shipping', ShippingSchema); 

  