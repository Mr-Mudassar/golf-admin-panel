import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    posts: [],
    page: 1,
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
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setIsSidebarOpen, setAppMode, setToken, setPosts, setPage } =
  UserSlice.actions;
export default UserSlice.reducer;
