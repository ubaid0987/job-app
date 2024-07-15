import React from 'react';

const LandingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-cover" style={{ backgroundImage: "url('https://source.unsplash.com/random/1600x900')" }}>
      <div className="bg-white bg-opacity-80 p-8 rounded shadow-md text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to JobConnect</h1>
        <p className="text-lg mb-6">Find your dream job or your next great hire!</p>
        <div className="space-x-4">
          <a href="/login" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Login</a>
          <a href="/signup" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
