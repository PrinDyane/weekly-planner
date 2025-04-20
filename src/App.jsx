import React, { useState, useEffect } from 'react';
import Planner from "./components/Planner";
import LoginForm from "./components/LoginForm";
import mascote from "./assets/mascote-planner.png";
import './App.css'

// main app component 
const App = () => {
  const [user, setUser] = useState(null); //save the user name(if logged in)

//check if user is saved in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('plannerUser');
    if (savedUser) setUser(savedUser); //if found, set user
  }, []);

  //when user log in 
    const handleLogin = (username) => {
      setUser(username);
    };
    // when user logout 
    const handleLogout = () => {
      localStorage.removeItem('plannerUser');
      setUser(null);
    };

  return (
    <>
      <div className="bg-[#A18BFF]">
        <img src={mascote} alt="mascote planner" className='w-28 fixed bottom-4 right-4 z-10 animate-bounce'/>
        <h1 className='text-2xl font-bold text-center text-white'>Weekly planner</h1>
      </div>
      {user ? (
       <Planner  user={user} onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </>
  
  );
};

export default App
