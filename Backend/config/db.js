require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Connection to database successful'))
        .catch((err) => console.log('Error connecting to database:', err.message))
};

module.exports = connectDB;