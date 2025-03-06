import mongoose from 'mongoose';
const BannerSchema = new mongoose.Schema({
    name : {type : String, required : true},
    selected : {type : Boolean, default : false},
    img1: { type: String, required: true },
    img2: { type: String, required: true },
    img3 : { type: String, required: true },
    img4 : { type: String, required: true }
});

export const Banner = mongoose.model('Banner', BannerSchema);

 