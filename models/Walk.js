//Walk model 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walkSchema = new Schema({
    title: String,
    image: String,
    distance: String,
    difficulty: String,
    location: String,
    coordinates: {
        type: [Number], //Array of numbers: [latitude, longitude]
        required: false
    }
});

const Walk = mongoose.model('Walk', walkSchema);

module.exports = Walk;
