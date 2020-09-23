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
        const restaurantRatingsData = await db.query(
            'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating from reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;'
        );
        res.status(200).json({
            status: 'success',
            data: {
                restaurants: restaurantRatingsData.rows,
            },
        });
    } catch (err) {
        console.error(err);
    }
});
//Get single restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await db.query(
            'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating from reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1;',
            [req.params.id]
        );
        const reviews = await db.query(
            'SELECT * FROM reviews WHERE restaurant_id = $1',
            [req.params.id]
        );
        res.status(200).json({
            status: 'success',
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows,
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

app.post('/api/v1/restaurants/:id/addReview', async (req, res) => {
    const {name, review, rating} = req.body;
    try {
        const response = await db.query(
            'INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1,$2,$3,$4) RETURNING *',
            [req.params.id, name, review, rating]
        );
        res.status(201).json({
            status: 'success',
            data: {
                msg: 'Created new restaurant',
                restaurant: response.rows[0],
            },
        });
    } catch (err) {}
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
