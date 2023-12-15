import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedData: "",
};

export const selectedDataSlice = createSlice({
  name: "selectedData",
  initialState,
  reducers: {
    setSelectedData: (state, action) => {
      state.selectedData = action.payload;
    },
  },
});

export const { setSelectedData } = selectedDataSlice.actions;
export default selectedDataSlice.reducer;
