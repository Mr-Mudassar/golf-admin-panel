import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
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
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setIsSidebarOpen, setAppMode, setToken } = UserSlice.actions;
export default UserSlice.reducer;
