import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';

import './AppHeader.scss';
import { logOut } from '../../redux/store/store';
//import avatarDefault from '../../images/Avatar 1.png';

const AppHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authorization);

  const avatar = user?.image; //? user.image : avatarDefault;

  const handleClickLogOut = () => {
    dispatch(logOut());
  };

  return (
    <header className="header">
      <div className="title">
        <div className="link">
          <NavLink to="/" className="nav-link">
            <div className="button">
              <span className="title__text">Realworld Blog</span>
            </div>
          </NavLink>
        </div>
        <div className="link">
          {user.token && (
            <>
              <NavLink to="/new-article" className="nav-link">
                <Button className="button" style={{ border: '1px solid #52C41A', color: '#52C41A' }}>
                  Create article
                </Button>
              </NavLink>
              <NavLink to="/profile" className="nav-link">
                <div className="button">
                  <span className="title__text">{user.username}</span>
                  {avatar && <img src={avatar} alt="avatar" />}
                </div>
              </NavLink>
              <NavLink to="/" className="nav-link">
                <Button
                  onClick={handleClickLogOut}
                  className="button button__large"
                  style={{ border: '1px solid rgba(0, 0, 0, 0.75)', color: 'rgba(0, 0, 0, 0.75)' }}
                >
                  Log Out
                </Button>
                {/* <button type="button" className="button" onClick={handleClickLogOut}>
                  <span className="title__text">Log Out</span>
                </button> */}
              </NavLink>
            </>
          )}
          {!user.token && (
            <>
              <NavLink to="/sign-in" className="nav-link">
                <div className="button">
                  <span className="title__text">Sign In</span>
                </div>
              </NavLink>
              <NavLink to="/sign-up" className="nav-link">
                <Button className="button button__large" style={{ border: '1px solid #52C41A', color: '#52C41A' }}>
                  Sign Up
                </Button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
