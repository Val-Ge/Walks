const mongoose = require('mongoose');

const walkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: { type: String, 
        required: true 
    }
});

module.exports = mongoose.model('Walk', walkSchema);