const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes/index');
const port = process.env.PORT || 8000;
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

// middleware function
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// all routes
app.use(router);

// check connection
app.get('/', (req, res) => {
    res.send('Express works properly! don\'t forget to have fun');
});

// listen to the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 
