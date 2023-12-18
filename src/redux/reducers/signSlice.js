import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import blogPlatformService from '../service/blogPlatformService';

export const reducerFunction = (name) => {
  return createAsyncThunk(name, async (stateArg, { rejectWithValue }) => {
    try {
      const response = await blogPlatformService[name](stateArg);
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

export const signUp = reducerFunction('signUp');
export const signIn = reducerFunction('signIn');
export const edit = reducerFunction('edit');
export const getUser = reducerFunction('getUser');

const signSlice = createSlice({
  name: 'sign',
  initialState: {
    token: localStorage.getItem('token'),
    username: null,
    email: null,
    bio: null,
    image: null,
    loading: false,
    errors: null,
  },
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.username = null;
      state.email = null;
      state.bio = null;
      state.image = null;

      state.loading = false;
      state.errors = null;
    },
    clearAuthenticationErrors: (state) => {
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.errors = null;

        if (action.payload && action.payload.user && action.payload.user.token) {
          state.token = action.payload.user.token;
          localStorage.setItem('token', action.payload.user.token);
          state.username = action.payload.user.username;
          state.email = action.payload.user.email;
          state.bio = action.payload.user.bio;
          state.image = action.payload.user.image;
        }

        console.log(state.token);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.errors) state.errors = action.payload.errors;
      })
      // --------------------------------------------------------------------------------
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.errors = null;

        if (action.payload?.user?.token && action.payload.user.email && action.payload.user.username) {
          state.username = action.payload.user.username;
          state.email = action.payload.user.email;
          state.bio = action.payload.user.bio;
          state.token = action.payload.user.token;
          state.image = action.payload.user.image;
          localStorage.setItem('token', action.payload.user.token);
        }
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.errors) state.errors = action.payload.errors;
      })
      // --------------------------------------------------------------------------------
      .addCase(edit.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.loading = false;
        state.errors = null;

        if (action.payload?.user?.token && action.payload.user.email && action.payload.user.username) {
          state.token = action.payload.user.token;
          state.email = action.payload.user.email;
          state.username = action.payload.user.username;
          state.bio = action.payload.user.bio;
          state.image = action.payload.user.image;
          localStorage.setItem('token', action.payload.user.token);
        }
      })
      .addCase(edit.rejected, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.errors) state.errors = action.payload.errors;
      })
      // --------------------------------------------------------------------------------
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.errors = null;

        if (action.payload?.user?.token && action.payload.user.email && action.payload.user.username) {
          state.username = action.payload.user.username;
          state.email = action.payload.user.email;
          state.bio = action.payload.user.bio;
          state.token = action.payload.user.token;
          state.image = action.payload.user.image;
          localStorage.setItem('token', action.payload.user.token);
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.errors) state.errors = action.payload.errors;
      });
  },
});

export default signSlice;
