const mongoose = require('mongoose');

const genreSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide genre name!']
    },
    description: {
        type: String,
        required: [true, 'Please provide genre description!']
    },
});

module.exports = mongoose.model('Genre', genreSchema);