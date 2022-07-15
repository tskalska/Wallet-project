import { createSlice } from "@reduxjs/toolkit";
import authOperations from "./authOperation";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isAuth: false,
  isFetchingCurrentUser: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [authOperations.register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
      state.isLoading = false;
    },
    [authOperations.register.pending](state) {
      state.isLoading = true;
    },
    [authOperations.register.rejected](state) {
      state.isLoading = false;
    },

    [authOperations.logIn.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
      state.isLoading = false;
    },
    [authOperations.logIn.pending](state) {
      state.isLoading = true;
    },
    [authOperations.logIn.rejected](state) {
      state.isLoading = false;
    },

    [authOperations.logOut.fulfilled](state, action) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isAuth = false;
      state.isLoading = false;
    },
    [authOperations.logOut.pending](state) {
      state.isLoading = true;
    },
    [authOperations.logOut.rejected](state) {
      state.isLoading = false;
    },

    [authOperations.fetchCurrentUser.pending](state) {
      state.isFetchingCurrentUser = true;
      state.isLoading = true;
    },
    [authOperations.fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isAuth = true;
      state.isFetchingCurrentUser = false;
      state.isLoading = false;
    },
    [authOperations.fetchCurrentUser.rejected](state) {
      state.token = null;
      state.isFetchingCurrentUser = false;
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
