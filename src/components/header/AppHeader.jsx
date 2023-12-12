import React from 'react';
import { Link } from 'react-router-dom';

import './AppHeader.scss';

const AppHeader = () => {
  return (
    <header className="header">
      <div className="title">
        <Link to={'/blog//*'}>
          <span>Realworld Blog</span>
        </Link>
      </div>
      {/* <Account /> */}
    </header>
  );
};

export default AppHeader;
