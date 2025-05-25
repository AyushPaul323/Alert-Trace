const mongoose = require('mongoose')

const EnquirySchema = new mongoose.Schema({
    name: String,
    phone: Number,
    location: String,
    problemType: String,
    description: String
})

const EnquiryModel = mongoose.model("enquiries", EnquirySchema)
module.exports = EnquiryModel