const Genre = require('../models/genresModel');

exports.createGenre = async (data, msg) => {
    const genre = await Genre.create({
        ...data,
        _id: data.id,
    });
    
    msg.ack();
}

exports.deleteGenre = async(data, msg) => {
    const genre = await Genre.findByIdAndDelete(data.id);

    msg.ack();
}