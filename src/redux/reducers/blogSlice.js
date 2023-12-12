import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import blogPlatformService from '../service/blogPlatformService';

export const getPosts = createAsyncThunk('blog/getPosts', async (stateArg) => {
  try {
    const response = await blogPlatformService.getPostsList(stateArg.pageNumber, stateArg?.token);
    if (!response.ok) console.log('data.ok === false', response);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    currentPage: 1,
    totalPosts: 0,
    loading: false,
    error: false,
    posts: [],
  },
  reducers: {
    togglePage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.posts = null;
        state.totalPosts = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.totalPosts = action.payload.articlesCount;
        state.posts = action.payload.articles;
        state.loading = false;
        state.error = false;
      })
      .addCase(getPosts.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.posts = null;
        state.totalPosts = null;
      });
  },
});

export default blogSlice;
