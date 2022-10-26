import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = `https://wallet-project-app.herokuapp.com/api`;

toast.configure();
const toastMessage = (errorMessage) => {
  toast.error(errorMessage, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
  });
};

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset(token) {
    axios.defaults.headers.common.Authorization = "";
    localStorage.removeItem(token);
    console.log(token);

  },
};

/*
 * POST, /users/register
 * body: { name, email, password }
 */
const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/users/register", credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      if (error.response.status === 400) {
        toastMessage("Ошибка ввода данных! Попробуйте еще раз!");
      } else if (error.response.status === 409) {
        toastMessage("Почта уже используется.");
      } else if (error.response.status === 500) {
        toastMessage("Сервер временно не работает. Попробуйте позже!");
      } else {
        toastMessage("Упс... что-то пошло не так. Перезагрузите страницу.");
      }
      return rejectWithValue(error);
    }
  }
);

/*
 * POST, /users/login
 * body: { email, password }
 */
const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/users/login", credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      toastMessage("Invalid email or password.");
      return rejectWithValue(error);
    }
  }
);

/*
 * GET, /users/logout
 */
const logOut = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.get("/users/logout");
    token.unset();
  } catch (error) {
    if (error.response.status === 500) {
      toastMessage("Service Unavailable. Try later!");
    } else {
      toastMessage("Oops, something went wrong. Reload the page.");
    }
  }
});

const fetchCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {

      return thunkAPI.rejectWithValue();
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      token.unset();
        toastMessage("Your session has timed out. Please login again.");
      return thunkAPI.rejectWithValue();
    }
  }
);

const operations = {
  register,
  logIn,
  logOut,
  fetchCurrentUser,
};

export default operations;
