import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import blogPlatformService from '../service/blogPlatformService';

export const reducerFunction = (name) => {
  return createAsyncThunk(name, async (stateArg, { rejectWithValue }) => {
    try {
      console.log(name, stateArg);
      const response = await blogPlatformService[name](stateArg);
      console.log(response);
      const data = await response.json();
      if (response.ok) {
        if (stateArg?.cb) stateArg.cb();
        return data;
      }
      return rejectWithValue(data);
    } catch (error) {
      console.log('data.ok === false', error);
      return rejectWithValue(error.response.data);
    }
  });
};

// export const reducerFunctionLike = (name) => {
//   return createAsyncThunk(name, async (stateArg, { rejectWithValue }) => {
//     try {
//       const response = await blogPlatformService.favoritePost(stateArg);
//       const data = await response.json();
//       if (response.ok) {
//         return data.article.favorited;
//       }
//       rejectWithValue(data.errors.body);
//     } catch (error) {
//       console.log(error);
//       rejectWithValue(error);
//     }
//   });
// };

export const setPost = reducerFunction('setPost');
export const getPost = reducerFunction('getPost');
export const editPost = reducerFunction('editPost');
export const deletePost = reducerFunction('deletePost');
// export const like = reducerFunctionLike('post/Like');

const postSlice = createSlice({
  name: 'post',
  initialState: {
    loading: false,
    error: false,
    post: null,
    like: false,
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
    //-------------------------------------------------------
    // .addCase(like.pending, (state) => {
    //   state.loading = true;
    //   state.error = false;
    // })
    // .addCase(like.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = false;
    //   if (action.payload?.article?.favoritesCount) {
    //     state.post.favoritesCount = action.payload.article.favoritesCount;
    //   }
    //   if (action.payload?.article?.favorited) {
    //     state.post.favorited = action.payload.article.favorited;
    //   }
    // })
    // .addCase(like.rejected, (state, action) => {
    //   state.loading = false;
    //   if (action.payload && action.payload.errors) state.error = action.payload;
    // });
  },
});

export default postSlice;
