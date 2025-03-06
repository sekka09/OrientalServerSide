import mongoose from 'mongoose';
const CodePromoSchema = new mongoose.Schema({
    code: { type: String, required: true }, 
    sells: { type: Number, required: true },  
    sellsc: { type: Number, required: true },
    reduction : { type: Number, required: true },  
    afiliateshare : { type: Number, required: true  },
});

export const CodePromo = mongoose.model('CodePromo', CodePromoSchema);