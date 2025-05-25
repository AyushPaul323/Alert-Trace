import { Schema} from "mongoose";
import mongoose from "mongoose";
const emergencySchema= new Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        trim:true,
        minLength:[2, "Name must be larger than 2 characters"],
        maxLength:[50, "Name must be smaller than 50 characters"],
    },

    phone: {
        type: Number,
        required: [true, "Phone is Required"],
        match: [/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/i, "Invalid Phone Number"],
        },

    location: {
        type: String,
        required: [true, "Location is Required"],
    },
    date : {
        type: Date,
        default: Date.now,
    },
});

const Emergency = mongoose.models.Emergency || mongoose.model('Emergency', emergencySchema);

export default Emergency;