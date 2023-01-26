import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    currentTheme: "theme1",
  },
  reducers: {
    changeTheme: (state, action: PayloadAction<string>) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export const selectCurrentTheme = (state: RootState) =>
  state.theme.currentTheme;

export default themeSlice.reducer;
