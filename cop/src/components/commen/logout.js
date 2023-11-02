import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user data from localStorage or perform any necessary cleanup
    // localStorage.removeItem('userData');

    // Redirect to the login page or any other desired route
    navigate('/');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
