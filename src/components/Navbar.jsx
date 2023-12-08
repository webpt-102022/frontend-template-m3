import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

export default function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [buttonColor, setButtonColor] = useState('');

  const cambiarColor = () => {
    setButtonColor('purple');
  };

  return (
    <header>
      <div className='Header'>
        <ul className='nav-links'>
          <li className='nav_link_button'>
            <button style={{ color: buttonColor }}>
              <NavLink to="/">Home</NavLink>
            </button>
          </li>
          {!isLoggedIn &&
            <li className='nav_link_button'>
              <button style={{ color: buttonColor }} onClick={cambiarColor}>
                <NavLink to="/signup">Sign up</NavLink>
              </button>
            </li>}
          {!isLoggedIn &&
            <li className='nav_link_button'>
              <button>
                <NavLink to="/login">Login</NavLink>
              </button>
            </li>}
          {isLoggedIn &&
            <li className='nav_link_button'>
              <button>
                <NavLink to="/private">
                  <FontAwesomeIcon icon={faUser} />
                </NavLink>
              </button>
            </li>}
          {isLoggedIn &&
            <li className='nav_link_button'>
              <button onClick={() => logOutUser()}>
                Log out
              </button>
            </li>}
          <li className='nav_link_button'>
            <button onClick={() => navigate(-1)}>
              Back
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
