import mongoose from 'mongoose';
const ContactSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    phonenumber: { type: String, required: true },
    message : { type: String, required: true },
});

export const Contact = mongoose.model('Contact', ContactSchema);

 