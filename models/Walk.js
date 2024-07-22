// Your Walk model might be defined something like this
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
        required: true
    }
});

const Walk = mongoose.model('Walk', walkSchema);

module.exports = Walk;
