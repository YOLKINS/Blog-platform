import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Online, Offline } from 'react-online-status';

import Blog from '../blog/Blog';
import Post from '../post/Post';
import SignUp from '../signUp/SignUp';
import SignIn from '../signIn/SignIn';
import Edit from '../edit/Edit';
import NewPost from '../new-post/NewPost';
import EditPost from '../edit-post/EditPost';
import { NetworkLost } from '../errors/errors';

import './AppMain.scss';

const AppMain = () => {
  return (
    <main className="main">
      <Online>
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
            <Route path={'/articles/:slug/edit/'} element={<EditPost />} />
          </Routes>
        </div>
      </Online>
      <Offline>
        <NetworkLost />
      </Offline>
    </main>
  );
};

export default AppMain;
