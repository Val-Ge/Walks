//Walk model 
import mongoose from 'mongoose';
const { Schema } = mongoose;

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

export default Walk;
