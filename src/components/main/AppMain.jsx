import React from 'react';
// import { Routes, Route } from 'react-router-dom';

import Blog from '../blog/Blog';

import './AppMain.scss';

const AppMain = () => {
  return (
    <div className="main">
      <div className="container">
        <Blog />
      </div>
    </div>
  );
};

export default AppMain;
