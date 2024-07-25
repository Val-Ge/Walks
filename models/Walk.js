import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the schema for Walk
const walkSchema = new Schema({
    title: { type: String, required: true },
    distance: { type: String, required: true },
    difficulty: { type: String, required: true },
    location: { type: String, required: true },
    coordinates: { 
        type: [Number], // Store coordinates as an array of numbers
        required: false
    },
    image: { type: String, required: false }
});

// Create the Walk model from the schema
const Walk = mongoose.model('Walk', walkSchema);

export default Walk;
