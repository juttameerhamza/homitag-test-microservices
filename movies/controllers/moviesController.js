const Movie = require('../models/moviesModel');
const Genre = require('../models/genresModel');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');

exports.getAllmovies = catchAsync(async (req, res, next) => {
    // const movies = await Movie.find().populate('genres');
    const movies = await Movie.find();
    
    res.status(200).json({
        status: 'success',
        movies
    });
});

exports.createMovie = catchAsync(async (req, res, next) => {
    const movie = await Movie.create(req.body);

    res.status(201).json({
        status: 'success',
        movie
    });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: 'success',
        movie
    });
});

exports.getMovie = catchAsync(async (req, res, next) => {
    const movie = await Movie.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        movie
    });
});

exports.getAllGenres = catchAsync(async (req, res, next) => {
    const genres = await Genre.find();

    res.status(200).json({
        status: 'success',
        genres
    });
});