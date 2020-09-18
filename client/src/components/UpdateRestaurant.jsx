import React, {useState, useContext, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = (props) => {
    const {id} = useParams();
    let history = useHistory();
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        price_range: '',
    });
    const {name, location, price_range} = formData;
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    };
    const loadRestaurant = async (id) => {
        const response = await RestaurantFinder.get(`/${id}`);
        await setFormData(response.data.data.restaurant);
    };
    useEffect(() => {
        loadRestaurant(id);
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        await RestaurantFinder.put(`/${id}`, formData);
        history.push('/');
    };
    return (
        <div>
            <form action=''>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        id='name'
                        className='form-control'
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='location'>Location</label>
                    <input
                        type='text'
                        id='location'
                        className='form-control'
                        value={location}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='price_range'>Price Range</label>
                    <input
                        type='number'
                        id='price_range'
                        className='form-control'
                        value={price_range}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type='submit'
                    className='btn btn-primary'
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UpdateRestaurant;
