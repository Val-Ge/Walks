import mongoose from 'mongoose';
const { Schema } = mongoose;

const walkSchema = new Schema({
    title: { type: String, required: true },
    distance: { type: String, required: true },
    difficulty: { type: String, required: true },
    location: { type: String, required: true },
    coordinates: {
        lat: { type: Number, required: false },
        lon: { type: Number, required: false }
    },
    image: { type: String, required: false }
});

const Walk = mongoose.model('Walk', walkSchema);

export default Walk;
