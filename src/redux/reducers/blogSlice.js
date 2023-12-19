import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import blogPlatformService from '../service/blogPlatformService';

export const getPosts = createAsyncThunk('blog/getPosts', async ({ pageNumber, token }, { rejectWithValue }) => {
  try {
    const response = await blogPlatformService.getPostsList({ pageNumber, token });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    return rejectWithValue();
  } catch (error) {
    console.log('data.ok === false', error);
    return rejectWithValue();
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
