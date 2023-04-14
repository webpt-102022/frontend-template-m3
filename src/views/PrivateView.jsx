/*import React from 'react'

export default function PrivateView() {
  return (
    <div>
      <h5>This view can only be seen if the user is logged in because it's inside the IsPrivate component.</h5>
    </div>
  )
}
*/

/*
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../../components/UserCard';
//import { knowledge } from '../../data';  
import userService from '../../services/userService';
//import IsPrivate from '../components/IsPrivate';

export default function PrivateView() {
    const { usersId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    const getUser = async () => {
        try {
            const response = await userService.getUser(usersId);
            setLoading(false);
            setUser(response);
            setError(false);
            console.log(response);
        } catch (error) {
            console.error(error)
            setLoading(false);
        }
    }

    useEffect(() => {
        getUser();
        // eslint-disable-next-line
    }, [usersId])

    return (
        <div>
            {loading && <p>Perfil de esta persona</p>}
            {!loading && user && <UserCard user={user} />}
            {error && <p>Something went wrong. Couldn't find your User</p>}
        </div>
    )
}
*/



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IsPrivate from '../components/IsPrivate';
import { NavLink } from 'react-router-dom';
//import UserCard from '../../components/UserCard';

export default function PrivateView() {
    const storedToken = localStorage.getItem('authToken')
    const [user, setUser] = useState("");

    // GET USER DATA 
    useEffect(() => {
        const getData = async () => {
          try {
            const user = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/me`, { headers: { Authorization: `Bearer ${storedToken}` } });
            return setUser(user.data);
          } catch (error) {
            console.error(error);
          }
        };
        getData();
      }, [storedToken]);
      
  return (
    <div className='userProfile'>
    <IsPrivate />
    
      {!user && <p>Loading...</p>}
      {user && (
        <div className='profileData'>
        
          <h1> Hello {user.username}</h1>
          <p>my perfil</p>
          <div>
            <img src={user.profileImage} alt={user.profileImage}/>
          </div>
          <div>
          <p>Contact me: {user.email}</p>
          </div>
          <NavLink to={`/private/edit/${user._id}`}>Edit profile</NavLink>
        </div>
      ) }
    </div>
  )
}

