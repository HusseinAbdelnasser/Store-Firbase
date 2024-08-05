import React from 'react';
import { Outlet } from 'react-router-dom';
import Header1 from './header/Header1';
import Footer from './footer/footer';

const MainLayout = () => {
  return (
    <div>
      <div className="header"><Header1 /></div> 
       <div className="outlet"><Outlet /></div>
      <div className="footer"><Footer /></div> 
    </div>
  )
}

export default MainLayout;