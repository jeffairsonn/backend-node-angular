require('dotenv').config()
const mongoose = require('mongoose');

const dbUrl = "mongodb+srv://jeffairson:jeffairson12@cluster0.dk8cp.mongodb.net/?retryWrites=true"
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.on('open', () => console.log('connexion à la base de donnée réussie'));