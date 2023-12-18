import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import blogPlatformService from '../service/blogPlatformService';

export const reducerFunction = (name) => {
  return createAsyncThunk(name, async (stateArg) => {
    try {
      const response = await blogPlatformService[name](stateArg);
      if (!response.ok) console.log('data.ok === false', response);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  });
};

export const setPost = reducerFunction('setPost');
export const getPost = reducerFunction('getPost');
export const editPost = reducerFunction('editPost');
export const deletePost = reducerFunction('deletePost');

const postSlice = createSlice({
  name: 'post',
  initialState: {
    loading: false,
    error: false,
    post: null,
  },
  reducers: {
    clearPostErrors: (state) => {
      state.error = false;
    },
  },
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
      })
      //-----------------------------------------------------
      .addCase(setPost.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.post = null;
      })
      .addCase(setPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        if (action.payload?.article) {
          state.post = action.payload.article;
        }
      })
      .addCase(setPost.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.post = null;
      })
      //-------------------------------------------------------
      .addCase(editPost.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.post = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        if (action.payload?.article) {
          state.post = action.payload.article;
        }
      })
      .addCase(editPost.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.post = null;
      })
      //-------------------------------------------------------
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.post = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        if (action.payload?.article) {
          state.post = action.payload.article;
        }
      })
      .addCase(deletePost.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.post = null;
      });
  },
});

export default postSlice;
