require('dotenv').config();

const express = require('express');
const { MongoClient } = require("mongodb");

// connection to the database
const ConnectedDB = require('./Database/ConnectDB')

// start express
const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({ extended: true}));

// for upload file 
app.set('view engine', 'ejs');

// cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    next();
});

//User routes
const userRouter = require('./routes/User');
app.use('/api/user', userRouter);

//Course routes
const courseRouter = require('./routes/Course');
app.use('/api/course', courseRouter);

const imageRouter = require('./routes/Image');
app.use('/api/image', imageRouter);

// //flash routes
// const orderRouter = require('./routes/Flash');
// app.use('/api/card', orderRouter);


const PORT = 8000;
app.listen(PORT, () => {
   console.log(`le serveur est lancé sur le port ${PORT}`)
})