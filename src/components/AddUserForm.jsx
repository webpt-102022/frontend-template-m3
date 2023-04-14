import React, { useState } from 'react'
//import { NavLink } from 'react-router-dom';
//<NavLink to="/">Create</NavLink>
export default function AddUserForm({ handleAddUser }) {
    const initialState = {
        username: '',
        profileImage: '',
        country: '',
        city: '',
        contactInfo: '',
        description: '',
    };

    const [newUser, setNewUser] = useState(initialState);

    const handleChange = (e) => {
        setNewUser(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddUser(newUser);
        setNewUser(initialState);
    };

    return (
        <div className="form_container">
            <form onSubmit={handleSubmit}>
                <label>username</label>
                <input type="text" name="username" value={newUser.username} onChange={handleChange} required />
                <label>profileImage:</label>
                <input type="text" name="profileImage:" required value={newUser.profileImage} onChange={handleChange} />
                <label>Country</label>
                <input type="text" name="country" required value={newUser.country} onChange={handleChange} />
                <label>City</label>
                <input type="text" name="city" required value={newUser.city} onChange={handleChange} />
                <label>Contact Me:</label>
                <input type="text" name="contactInfo" required value={newUser.contactInfo} onChange={handleChange} />
                <button type="submit" className="btn">Create</button> 
            </form>
        </div>
    )
};