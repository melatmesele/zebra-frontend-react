import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foamData: [],
};

export const foamDataSlice = createSlice({
  name: "foamData",
  initialState,
  reducers: {
    setFoamData: (state, action) => {
      state.foamData = action.payload;
    },
  },
});

export const { setFoamData } = foamDataSlice.actions;


export default foamDataSlice.reducer;
