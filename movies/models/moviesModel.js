const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide movie name!']
    },
    description: {
        type: String,
        required: [true, 'Please provide movie description!']
    },
    releaseDate: {
        type: Date,
        required: [true, 'Please provide movie release date!']
    },
    duration: {
        type: Number,
        required: [true, 'Please provide movie duration!']
    },
    rating: {
        type: Number,
        required: false
    },
    genres: [{
        type: mongoose.Types.ObjectId,
        ref: 'Genre'
    }]
});

module.exports = mongoose.model('Movie', movieSchema);