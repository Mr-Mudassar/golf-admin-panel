import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    user: null,
    appMode: "light",
    isSidebarOpen: true,
  },

  reducers: {
    setAppMode: (state, action) => {
      state.appMode = action.payload;
    },
    setIsSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setIsSidebarOpen, setAppMode } = UserSlice.actions;
export default UserSlice.reducer;
