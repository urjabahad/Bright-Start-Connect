const mongoose = require('mongoose');

// Define the schema
const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  }
});

// Create a model
const FormModel = mongoose.model('Form', formSchema);

// Example: Insert a form submission into the database
const formData = {
  name: 'John Doe',
  email: 'john@example.com',
  experience: 'I had a great experience working with an NGO in teaching.'
};

const formSubmission = new FormModel(formData);

formSubmission.save()
  .then(() => {
    console.log('Form submission saved successfully.');
  })
  .catch((error) => {
    console.error('Error saving form submission:', error);
  });
