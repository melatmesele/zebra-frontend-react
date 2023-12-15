import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  bergamoData: [],
};

export const bergamoDataSlice = createSlice({
  name: "bergamoData",
  initialState,
  reducers: {
    setBergamoData: (state, action) => {
      state.bergamoData = action.payload;
    },
  },
});

export const { setBergamoData } = bergamoDataSlice.actions;
export default bergamoDataSlice.reducer;
