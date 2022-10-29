const natsWrapper = require('../utils/natsWrapper');
const Listener = require('../utils/natsListener');
const genreListeners = require('./genreListeners');

const init = async () => {
    await new Listener(natsWrapper.client).listen('genre:created', 'genreQueue', genreListeners.createGenre);
    await new Listener(natsWrapper.client).listen('genre:deleted', 'genreQueue', genreListeners.deleteGenre);
}

module.exports = {
    init
}