const express = require('express');
const createHttpErrors = require('http-errors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
    res.send('working');
})

app.use((req, res, next) => {
    next(createHttpErrors.NotFound());
})

app.use((error, req, res, next) => {
    error.status = error.status || 500
    res.status(error.status)
    res.send(error)
})

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME
}).then(() => {
    console.log("connected to db...")
    app.listen(PORT, () => console.log(`listening on port ${PORT}`))
}).catch((err) => {
    console.log(err.message)
});
