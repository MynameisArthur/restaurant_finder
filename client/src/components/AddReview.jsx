import React, {useState} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import {useHistory, useParams} from 'react-router-dom';
const AddReview = () => {
    const {id} = useParams();
    const [formData, setFormData] = useState({
        name: '',
        review: '',
        rating: '',
    });
    const history = useHistory();
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    };
    const {name, review, rating} = formData;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`, {
                name,
                review,
                rating,
            });
            history.go(0);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className='mb-2'>
            <form onSubmit={handleSubmit}>
                <div className='form-row'>
                    <div className='form-group col-8'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            className='form-control'
                            id='name'
                            placeholder='name'
                            onChange={handleChange}
                            value={name}
                        />
                    </div>
                    <div className='form-group col-4'>
                        <label htmlFor='rating'>Rating</label>
                        <select
                            id='rating'
                            className='custom-select'
                            onChange={handleChange}
                            value={rating}
                        >
                            <option disabled>Rating</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='review'>Review</label>
                    <textarea
                        id='review'
                        cols='30'
                        rows='10'
                        className='form-control'
                        value={review}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div>
    );
};

export default AddReview;
