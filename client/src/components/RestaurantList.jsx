import React, {useEffect, useContext} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import {RestaurantContext} from '../context/RestaurantContext';

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantContext);
    const fetchData = async () => {
        try {
            const response = await RestaurantFinder.get('/');
            setRestaurants(response.data.data.restaurants);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className='list-group'>
            <table className='table table-hover table-dark'>
                <thead>
                    <tr className='bg-primary'>
                        <th scope='col'>Restaurant</th>
                        <th scope='col'>Location</th>
                        <th scope='col'>Price Range</th>
                        <th scope='col'>Ratings</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants.map((restaurant) => (
                        <tr>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{restaurant.price_range}</td>
                            <td>Rating</td>
                            <td>
                                <button className='btn btn-warning'>
                                    Update
                                </button>
                            </td>
                            <td>
                                <button className='btn btn-danger'>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RestaurantList;
