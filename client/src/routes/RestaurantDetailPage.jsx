import React, {useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
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
                    <div className='text-center'>
                        <StarRating
                            rating={Number(
                                selectedRestaurant.restaurant.average_rating
                            )}
                        />
                        <span className='text-warning ml-1'>
                            {selectedRestaurant.restaurant.count
                                ? `(${selectedRestaurant.restaurant.count})`
                                : '(0)'}
                        </span>
                    </div>
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
