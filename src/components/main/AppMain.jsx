import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Blog from '../blog/Blog';
import Post from '../post/Post';
import SignUp from '../signUp/SignUp';
import SignIn from '../signIn/SignIn';
import Edit from '../edit/Edit';
import NewPost from '../new-post/NewPost';

import './AppMain.scss';

const AppMain = () => {
  return (
    <main className="main">
      <div className="container">
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/articles/" element={<Blog />} />
          <Route path="/articles/:slug/" element={<Post />} />
          <Route path="*" element={<Blog />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<Edit />} />
          <Route path="/new-article" element={<NewPost />} />
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
    </main>
  );
};

export default AppMain;
