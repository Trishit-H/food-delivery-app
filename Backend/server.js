// importing external modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// importing internal modules
const connectDB = require('./config/db.js');
const foodRouter = require('./routes/foodRoute.js');
const userRouter = require('./routes/userRoute.js');


// app configuration
const app = express();
const PORT = process.env.PORT || 5002;

// middlewares
app.use(express.json());
app.use(cors());

// connecting to database
connectDB();

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'))

app.get('/', (req, res) => {
    res.send('API working!')
});

// starting server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});