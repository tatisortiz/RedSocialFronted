import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { Profile } from '../Profile/Profile';
import { CreatePost } from '../NewPost/NewPost';
import { Home } from '../Home/Home';
import { MyPosts } from '../MyPost/MyPost';
import { AllPosts } from '../Allposts/AllPosts';
import { NotFound } from '../NotFound/NotFound';
import { Admin } from '../Admin/Admin';
import { UserPosts } from '../UserPosts/UserPosts';





export const Body = () => {

 

  return (
    <>
      <Routes>
      <Route path="*" element={<NotFound/>} /> 
       <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createPost" element={<CreatePost />} /> 
        <Route path="/myPosts" element={<MyPosts />} /> 
        <Route path="/worldPosts" element={<AllPosts />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/userPosts/:userId/:firstname/:lastname" element={<UserPosts />} />
      </Routes>
    </>
  );
};
