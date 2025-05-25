import { Schema} from "mongoose";
import mongoose from "mongoose";
const enquirySchema= new Schema({
    name: {
                type: String,
                required: [true, "Name is Required"],
                trim:true,
                minLength:[2, "Name must be larger than 2 characters"],
                maxLength:[50, "Name must be smaller than 50 characters"],
            },
        
            phone: {
                type: Number,
                required: [true, "Number is Required"],
                match: [/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/i, "Invalid Phone Number"],
                },
        
            location: {
                    type: String,
                    required: [true, "Location is Required"],
                },
        
            problemType: {
                    type: String,
                    required: [true, "State Problem Type"], 
                },
            description: {
                    type: String,
                    required: [true, "State Problem Description"], 
                },
    date : {
        type: Date,
        default: Date.now,
    },
});

const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);

export default Enquiry;