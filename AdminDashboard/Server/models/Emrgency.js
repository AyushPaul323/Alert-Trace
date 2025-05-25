const mongoose = require('mongoose')

const EmergencySchema = new mongoose.Schema({
    name: String,
    phone: Number,
    location: String
})

const EmergencyModel = mongoose.model("emergencies", EmergencySchema)
module.exports = EmergencyModel