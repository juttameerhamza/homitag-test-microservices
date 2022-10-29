const express = require('express');
const moviesController = require('./controllers/moviesController');

const router = express.Router();

router.route('/')
    .get(moviesController.getAllmovies)
    .post(moviesController.createMovie);

router.route('/:id')
    .get(moviesController.getMovie)
    .delete(moviesController.deleteMovie);

router.route('/list/genres')
    .get(moviesController.getAllGenres);

module.exports = router;