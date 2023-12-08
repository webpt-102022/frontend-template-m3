
import React from 'react';
import { Link } from 'react-router-dom';

export default function UserCard({ user, handleDelete }) {
    const { email,username, profileImage, country, city, contactInfo, description, _id,  userId } = user;
console.log(user._id)
    const handleDeleteUser = () => {
        handleDelete(_id, userId)
    };

    return (
        <div className="card">
            <h3>{username}</h3>
            <img src={profileImage} alt={username} />
            <p>{description}</p>
            <ul>
                <li>email: {email}</li>
                <li>country: {country}</li>
                <li>city: {city}</li>
                <li>conctact Info: {contactInfo}</li>
                <li>description: {description}</li>
            </ul>
            <button className="btn" style={{ marginLeft: '10px' }} onClick={handleDeleteUser}>Delete Perfil</button>
            <button className="btn" style={{ marginLeft: '10px' }}><Link to={`/private/edit/${_id}`}>Edit Perfil</Link></button>
        </div>
    )
};






/*
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


export default function UserCard({ user, handleDelete }) {
    const { email, username, profileImage, country, city, contactInfo, description, _id,  userId } = user;
    const { userAuth } = useAuth();
    const handleDeleteUser = () => {
        handleDelete(_id, userId)
        console.log("userAuth", userAuth);
console.log("userId", userId);

    };

    return (
        <div className="card">
        <h3>{username}</h3>
        <img src={profileImage} alt={username} />
        <p>{description}</p>
        <ul>
            <li>email: {email}</li>
            <li>country: {country}</li>
            <li>city: {city}</li>
            <li>conctact Info: {contactInfo}</li>
            <li>description: {description}</li>
        </ul>
        {userAuth && userAuth._id === userId && (
            <React.Fragment>
                <button className="btn" style={{ marginLeft: '10px' }} onClick={handleDeleteUser}>
                    Delete Perfil
                </button>
                <button className="btn" style={{ marginLeft: '10px' }}>
                    <Link to={`/private/edit/${_id}`}>Edit Perfil</Link>
                </button>
            </React.Fragment>
        )}
    </div>
    )
};
*/