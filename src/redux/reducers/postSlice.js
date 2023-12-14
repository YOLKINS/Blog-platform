import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import blogPlatformService from '../service/blogPlatformService';

export const getPost = createAsyncThunk('post/getPost', async (stateArg) => {
  try {
    const response = await blogPlatformService.getPost(stateArg.slug, stateArg?.token);
    if (!response.ok) console.log('data.ok === false', response);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const postSlice = createSlice({
  name: 'post',
  initialState: {
    loading: false,
    error: false,
    post: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.post = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        if (action.payload?.article) {
          state.post = action.payload.article;
        }
      })
      .addCase(getPost.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.post = null;
      });
  },
});

export default postSlice;
