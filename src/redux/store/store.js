import { configureStore } from '@reduxjs/toolkit';

import blogSlice, { getPosts } from '../reducers/blogSlice';
import postSlice, { getPost, setPost } from '../reducers/postSlice';
import signSlice, { signIn, signUp, edit, getUser } from '../reducers/signSlice';

export default configureStore({
  reducer: {
    postsList: blogSlice.reducer,
    post: postSlice.reducer,
    authorization: signSlice.reducer,
  },
});

const { togglePage } = blogSlice.actions;
const { clearAuthenticationErrors, logOut } = signSlice.actions;
const { clearPostErrors } = postSlice.actions;

export {
  getPosts,
  getPost,
  setPost,
  signUp,
  signIn,
  edit,
  getUser,
  togglePage,
  clearAuthenticationErrors,
  clearPostErrors,
  logOut,
};
