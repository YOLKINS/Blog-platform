import React from 'react';
import { NavLink } from 'react-router-dom';

import './AppHeader.scss';

const AppHeader = () => {
  return (
    <header className="header">
      <div className="title">
        <div className="link">
          <div className="button">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'title__active' : '')}>
              <span className="title__text">Realworld Blog</span>
            </NavLink>
          </div>
        </div>
        <div className="link">
          <div className="button">
            <NavLink to="/sign-in" className={({ isActive }) => (isActive ? 'title__active' : '')}>
              <span className="title__text">Sign In</span>
            </NavLink>
          </div>
          <div className="button">
            <NavLink to="/sign-up" className={({ isActive }) => (isActive ? 'title__active' : '')}>
              <span className="title__text">Sign Up</span>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
