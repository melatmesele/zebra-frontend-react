import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
  loginToken: null,
  token: null,
};

export const isLoggedInSlice = createSlice({
  name: "isLoggedIn",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLoginToken: (state, action) => {
      state.loginToken = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setIsLoggedIn, setLoginToken, setToken } =
  isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;
