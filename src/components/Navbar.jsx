import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, /*user, */ logOutUser } = useContext(AuthContext); 
  const navigate = useNavigate();
  return (
    <header>
    <div className='Header'>
      <ul className='nav-links'>
        <li><NavLink to="/">Home</NavLink></li>
        {!isLoggedIn && <li><NavLink to="/signup">Sign up</NavLink></li>}
        {!isLoggedIn && <li><NavLink to="/login">Login</NavLink></li>}
        {isLoggedIn && <li><NavLink to="/private">Profile</NavLink></li>}
        {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}
        <li><button onClick={() => navigate(-1)}>Go back</button></li>
      </ul>
    </div>
    </header>
  )
};
