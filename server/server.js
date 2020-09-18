const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config({path: './config.env'});
const db = require('./db');

//create express instance
const app = express();

//midlleware
app.use(express.json());
app.use(cors());

//Get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM restaurants');
        res.status(200).json({
            status: 'success',
            data: {
                restaurants: data.rows,
            },
        });
    } catch (err) {
        console.error(err);
    }
});
//Get single restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM restaurants WHERE id = $1', [
            req.params.id,
        ]);
        res.status(200).json({
            status: 'success',
            data: {
                restaurant: data.rows[0],
            },
        });
    } catch (err) {
        console.error(err);
    }
});
//Create a restaurant
app.post('/api/v1/restaurants', async (req, res) => {
    try {
        const {name, location, price_range} = req.body;
        const data = await db.query(
            'INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *',
            [name, location, price_range]
        );
        res.status(201).json({
            status: 'success',
            data: {
                msg: 'Created new restaurant',
                restaurant: data.rows[0],
            },
        });
    } catch (err) {
        console.error(err);
    }
});
//Update restaurants
app.put('/api/v1/restaurants/:id', async (req, res) => {
    const {name, location, price_range} = req.body;
    try {
        const data = await db.query(
            'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *',
            [name, location, price_range, req.params.id]
        );
        res.status(201).json({
            status: 'success',
            data: {
                restaurant: data.rows[0],
            },
        });
    } catch (err) {
        console.error(err);
    }
});
//Delete restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const data = await db.query('DELETE FROM restaurants WHERE id = $1', [
            req.params.id,
        ]);
        res.status(200).json({
            status: 'success',
            data: {
                msg: `Restaurant with the id of ${req.params.id} deleted`,
                restaurant: data.rows[0],
            },
        });
    } catch (err) {
        console.error(err);
    }
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
