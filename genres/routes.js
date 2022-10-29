const express = require('express');
const genresController = require('./controllers/genresController');

const router = express.Router();

router.route('/')
    .get(genresController.getAllGenres)
    .post(genresController.createGenre);

router.route('/:id')
    .get(genresController.getGenre)
    .delete(genresController.deleteGenre);

module.exports = router;