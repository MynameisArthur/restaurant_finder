const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

//create express instance
const app = express();

//midlleware
app.use(express.json());

app.get('/yelp', (req, res) => {
    res.status(200).json({success: true, data: 'Yelp app'});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
