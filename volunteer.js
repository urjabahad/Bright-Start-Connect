const mongoose = require('mongoose');
const Review = require('./review.js');
const passportLocalmongoose = require('passport-local-mongoose');

const volunteerSchema = new mongoose.Schema({
   
    username: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    workPreference: {
        teachingAssistant: {
            type: Boolean,
            default: false
        },
        contentWriting: {
            type: Boolean,
            default: false
        },
        mentorship: {
            type: Boolean,
            default: false
        },
        doubtSolving: {
            type: Boolean,
            default: false
        }
    },
    availableDays: {
        type: [String],
        required: true
    },
    availableTimes: {
        type: String,
        required: true
    },
  
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

volunteerSchema.plugin(passportLocalmongoose);
const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;
