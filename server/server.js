const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({path: './config.env'});

//create express instance
const app = express();

//midlleware
app.use(express.json());

//Get all restaurants
app.get('/api/v1/restaurants', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            restaurant: ['macdonalds', 'wendys', 'burger king'],
        },
    });
});
//Get single restaurant
app.get('/api/v1/restaurants/:id', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            restaurant: 'macdonalds',
        },
    });
});
//Create a restaurant
app.post('/api/v1/restaurants', (req, res) => {
    res.status(201).json({
        status: 'success',
        data: {
            restaurant: req.body,
        },
    });
});
//Update restaurants
app.put('/api/v1/restaurants/:id', (req, res) => {
    res.status(201).json({
        status: 'success',
        data: {
            restaurant: req.body,
        },
    });
});
//Delete restaurant
app.delete('/api/v1/restaurants/:id', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            msg: `Restaurant with the id of ${req.params.id} deleted`,
        },
    });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
