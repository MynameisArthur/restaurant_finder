import React, {useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import Reviews from '../components/Reviews';
import {RestaurantContext} from '../context/RestaurantContext';
const RestaurantDetailPage = () => {
    const {id} = useParams();
    const {selectedRestaurant, setSelectedRestaurant} = useContext(
        RestaurantContext
    );
    const fetchData = async () => {
        try {
            const response = await RestaurantFinder.get(`/${id}`);
            setSelectedRestaurant(response.data.data.restaurant);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {selectedRestaurant && (
                <>
                    <div className='mt-3'>
                        <Reviews />
                    </div>
                </>
            )}
        </div>
    );
};

export default RestaurantDetailPage;
