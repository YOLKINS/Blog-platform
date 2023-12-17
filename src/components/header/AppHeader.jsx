import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './AppHeader.scss';
import { logOut } from '../../redux/store/store';
import avatarDefault from '../../images/Avatar 1.png';

const AppHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authorization);

  const avatar = user.image ? user.image : avatarDefault;

  const handleClickLogOut = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    console.log('in header:  ', user.token);
  }, []);

  return (
    <header className="header">
      <div className="title">
        <div className="link">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'title__active' : '')}>
            <div className="button">
              <span className="title__text">Realworld Blog</span>
            </div>
          </NavLink>
        </div>
        <div className="link">
          {user.token && (
            <>
              <NavLink to="/new-article" className={({ isActive }) => (isActive ? 'title__active' : '')}>
                <div className="button">
                  <span className="title__text">Create article</span>
                </div>
              </NavLink>
              <NavLink to="/profile" className={({ isActive }) => (isActive ? 'title__active' : '')}>
                <div className="button">
                  <span className="title__text">{user.username}</span>
                  <img src={avatar} alt="avatar" />
                </div>
              </NavLink>
              <NavLink to="/">
                <button type="button" className="button" onClick={handleClickLogOut}>
                  <span className="title__text">Log Out</span>
                </button>
              </NavLink>
            </>
          )}
          {!user.token && (
            <>
              <NavLink to="/sign-in" className={({ isActive }) => (isActive ? 'title__active' : '')}>
                <div className="button">
                  <span className="title__text">Sign In</span>
                </div>
              </NavLink>
              <NavLink to="/sign-up" className={({ isActive }) => (isActive ? 'title__active' : '')}>
                <div className="button">
                  <span className="title__text">Sign Up</span>
                </div>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
