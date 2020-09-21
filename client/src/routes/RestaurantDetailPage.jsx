import React, {useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import AddReview from '../components/AddReview';
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
            setSelectedRestaurant(response.data.data);
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
                    <h1 className='text-center display-1'>
                        {selectedRestaurant.restaurant.name.toUpperCase()}
                    </h1>
                    <div className='mt-3'>
                        <Reviews reviews={selectedRestaurant.reviews} />
                    </div>
                    <div className='mt-3'>
                        <AddReview />
                    </div>
                </>
            )}
        </div>
    );
};

export default RestaurantDetailPage;
