const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const ApiError = require('./utils/apiError');
const natsWrapper = require('./utils/natsWrapper');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/genres', routes);

app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
});

natsWrapper.connect(
    process.env.NATS_CLUSTER_ID,
    process.env.NATS_CLIENT_ID,
    process.env.NATS_URL
)
.then(() => {console.log("Genres connected to NATS") })
.catch((error) => console.log('Genres connection failed to NATS!', error))

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('DB connection successful!'))
    .catch((error) => console.log('DB connection failed!', error))

app.listen(process.env.PORT, () => {
    console.log('Genres service started!');
});