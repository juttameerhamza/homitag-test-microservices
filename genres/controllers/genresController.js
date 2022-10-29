const Genre = require('../models/genresModel');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');
const natsWrapper = require('../utils/natsWrapper');
const Publisher = require('../utils/natsPublisher');

exports.getAllGenres = catchAsync(async (req, res, next) => {
    const genres = await Genre.find();

    res.status(200).json({
        status: 'success',
        genres
    });
});

exports.createGenre = catchAsync(async (req, res, next) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return next(new ApiError('name or description is required!', 400));
    }

    const genre = await Genre.create({ name, description });
    await new Publisher(natsWrapper.client).publish('genre:created', {
        id: genre._id,
        name: genre.name,
        description: genre.description
    });

    res.status(201).json({
        status: 'success',
        genre
    });
});

exports.deleteGenre = catchAsync(async (req, res, next) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    await new Publisher(natsWrapper.client).publish('genre:deleted', {
        id: genre._id,
    });

    res.status(200).json({
        status: 'success',
        genre
    });
});

exports.getGenre = catchAsync(async (req, res, next) => {
    const genre = await Genre.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        genre
    });
});