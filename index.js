const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Configuration
const uri = '';
mongoose.connect('mongodb://localhost:27017/contacto', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Contact Model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
}, {
  timestamps: true,
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.get('/contacts', (req, res) => {
  Contact.find()
    .then(contacts => res.json(contacts))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

app.post('/contacts/add', (req, res) => {
  const newContact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });

  newContact.save()
    .then(() => res.json('Contact added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
