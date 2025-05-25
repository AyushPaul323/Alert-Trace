const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmergencyModel = require('./models/Emrgency');
const ContactModel = require('./models/Contact');
const EnquiryModel = require('./models/Enquiry');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const MONGODB_URI = "mongodb+srv://abirdey712:V2bsNBL9qiierlLa@cluster0.fiv4bfv.mongodb.net/alerttrace_db";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected successfully");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

app.get('/getEmergency', (req, res) => {
  EmergencyModel.find()
    .then(emergencies => res.json(emergencies))
    .catch(err => res.status(500).json({ error: err.message }));
});
app.get('/getContact', (req, res) => {
    ContactModel.find()
      .then(contacts => res.json(contacts))
      .catch(err => res.status(500).json({ error: err.message }));
  });
  app.get('/getEnquiry', (req, res) => {
    EnquiryModel.find()
      .then(enquiries => res.json(enquiries))
      .catch(err => res.status(500).json({ error: err.message }));
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
