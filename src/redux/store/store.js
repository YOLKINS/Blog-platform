import { configureStore } from '@reduxjs/toolkit';

import blogSlice, { getPosts } from '../reducers/blogSlice';
import postSlice, { getPost } from '../reducers/postSlice';

export default configureStore({
  reducer: {
    postsList: blogSlice.reducer,
    post: postSlice.reducer,
  },
});

const { togglePage } = blogSlice.actions;

export { togglePage, getPosts, getPost };
