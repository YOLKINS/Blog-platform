import { configureStore } from '@reduxjs/toolkit';

import blogSlice, { getPosts } from '../reducers/blogSlice';

export default configureStore({
  reducer: {
    postsList: blogSlice.reducer,
  },
});

const { togglePage } = blogSlice.actions;

export { togglePage, getPosts };
