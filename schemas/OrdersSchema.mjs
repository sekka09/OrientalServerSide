import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phonenumber: { type: String, required: true },
    adresse : { type: String, required: true },
    wilaya : { type: String },
    shipping : {type : String},
    volume: { type: String, required: true },
    total: { type: Number, required: true },
    parfum : {type:String,required : true},
    orderDate: { type: Date, default: Date.now },
    confirmed : { type: Boolean, default: false }
});

export const Order = mongoose.model('Order', orderSchema);

 