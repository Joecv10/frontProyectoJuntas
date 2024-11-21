import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser as loginUserAPI,
  registerUser as registerUserAPI,
  getCurrentUser as getCurrentUserAPI,
  logoutUser as logoutUserAPI,
} from "../services/authService";

//Async Thunk

//Login Thunk
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {}
);

// Initial State
const initialState = {
  user: null,
};
