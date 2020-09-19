import React, {useEffect, useContext} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import {RestaurantContext} from '../context/RestaurantContext';
import {useHistory} from 'react-router-dom';
const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantContext);
    let history = useHistory();
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
    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            setRestaurants(
                restaurants.filter((restaurant) => restaurant.id !== id)
            );
        } catch (err) {
            console.error(err);
        }
    };
    const handleUpdate = (e, id) => {
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`);
    };
    const handleRestaurantSelect = (id) => {
        history.push(`/restaurants/${id}`);
    };
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
                    {restaurants &&
                        restaurants.map((restaurant) => (
                            <tr
                                key={restaurant.id}
                                onClick={() =>
                                    handleRestaurantSelect(restaurant.id)
                                }
                            >
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{'$'.repeat(restaurant.price_range)}</td>
                                <td>Rating</td>
                                <td>
                                    <button
                                        className='btn btn-warning'
                                        onClick={(e) =>
                                            handleUpdate(e, restaurant.id)
                                        }
                                    >
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className='btn btn-danger'
                                        onClick={(e) =>
                                            handleDelete(e, restaurant.id)
                                        }
                                    >
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
