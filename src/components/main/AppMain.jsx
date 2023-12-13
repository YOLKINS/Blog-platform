import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Blog from '../blog/Blog';
import Post from '../post/post';

import './AppMain.scss';

const AppMain = () => {
  return (
    <div className="main">
      <div className="container">
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/articles/" element={<Blog />} />
          <Route path="/articles/:slug/" component={<Post />} />
          <Route path="*" element={<Blog />} />
          {/* 
          <Route path={CREATE} component={CreateArticle} />

          <Route path={EDIT} component={EditArticle} />

          <Route path={ARTICLE} component={Article} />

          <Route path={LIST} exact component={ArticlesList} />

          <Route path={SIGNUP} component={SignUp} />

          <Route path={SIGNIN} component={SignIn} />

          <Route path={PROFILE} component={EditProfile} /> */}

          {/* <Redirect to="/" component={ArticlesList} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default AppMain;
