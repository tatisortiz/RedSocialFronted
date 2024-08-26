import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Register } from '../Register/Register';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Profile } from '../Profile/Profile';
import { NewPost } from '../NewPost/NewPost';




export const Body = () => {

 

  return (
    <>
      <Routes>
        
       <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/newpost" element={<NewPost />} /> */}
       
      
 
      </Routes>
    </>
  );
};
