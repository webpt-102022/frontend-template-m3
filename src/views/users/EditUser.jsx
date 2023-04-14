import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
/*import authService from '../../services/authService'; */
import userService from '../../services/userService';
import axios from 'axios';
import authService from '../../services/authService';

export default function EditUser() {
    const { userId } = useParams();
    const [ user, setUser ] = useState({});
    const [ error, setError ] = useState(false);
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const response = await authService.me(); 
            setUser(response);
            setError(false);
        } catch (error) {
            console.error(error)
            setError(true)
        }
    };

    useEffect(() => {
        getUser();
        // eslint-disable-next-line
    }, []);

    const handleChange = (e) => {
        setUser(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.editUser(userId, user); 
            //await axios.put(`http://localhost:8080/courses/${courseId}`, course) Ale
            await axios.put(`http://localhost:8080/users/${userId}`, user)  
            navigate(`/users/${userId}`)
            // toast 
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className="form_container">
            <form onSubmit={handleSubmit}>
                {error && <p>Something went wrong. Couldn't find your user</p>}
                <label>username</label>
                <input type="text" name="username" value={user.username} onChange={handleChange} required />
                <label>profileImage:</label>
                <input type="text" name="profileImage:" required value={user.profileImage} onChange={handleChange} />
                <label>Country</label>
                <input type="text" name="country" required value={user.country} onChange={handleChange} />
                <label>City</label>
                <input type="text" name="city" required value={user.city} onChange={handleChange} />
                <label>Contact Me:</label>
                <input type="text" name="contactInfo" required value={user.contactInfo} onChange={handleChange} />
                <button type="submit" className="btn"><NavLink to="/users">Save changes</NavLink></button> 
            </form>
        </div>
    )
}