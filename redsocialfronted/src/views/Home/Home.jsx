import React from 'react';
import { useNavigate } from 'react-router-dom';


export const  Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='home'>
        <div className='title'>RED SOCIAL</div>
        <div className='homebody'>
          <div className='text'>
            WHO ARE<br></br>
            
      
           RED SOCIAL
          </div>
          
        </div>
      </div>
    </>
  );
};