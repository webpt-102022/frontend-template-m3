import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function NotFound() {
  const location = useLocation();

  return (
    <div>
      <p>Sorry, there is no URL called {location.pathname} in this website. You might want to <button><Link to="/">go to the main site</Link></button></p>
    </div>
  )
}
