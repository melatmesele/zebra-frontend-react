import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userId: "",
};

export const userIdSlice = createSlice({
  name: "userId",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = userIdSlice.actions;
export default userIdSlice.reducer;
