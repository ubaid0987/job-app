import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl">JobConnect</h1>
      <nav className="space-x-4">
        {user ? (
          <>
            <Link to="/home" className="hover:underline">Home</Link>
            {user.role === 'employer' && (
              <>
                <Link to="/add-job" className="hover:underline">Post a Job</Link>
                <Link to="/applications" className="hover:underline">All Applications</Link>
              </>
            )}
            <button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
