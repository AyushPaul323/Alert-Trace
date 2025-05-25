import { Schema} from "mongoose";
import mongoose from "mongoose";
const contactSchema= new Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        trim:true,
        minLength:[2, "Name must be larger than 2 characters"],
        maxLength:[50, "Name must be smaller than 50 characters"],
    },

    email: {
        type: String,
        required: [true, "Email is Required"],
        match: [/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/i, "Invalid Email Address"],
        },

    message: {
        type: String,
        required: [true, "Message is Required"],
    },
    date : {
        type: Date,
        default: Date.now,
    },
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;