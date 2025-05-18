import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    page: 1,
    posts: [],
    user: null,
    token: null,
    appMode: "light",
    isSidebarOpen: true,
    allUser: [],
    allUserPage: 1,
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
    setAllUser: (state, action) => {
      state.allUser = action.payload;
    },
    setAllUserPage: (state, action) => {
      state.allUserPage = action.payload;
    },
  },
});

export const {
  setIsSidebarOpen,
  setAppMode,
  setToken,
  setPosts,
  setPage,
  setAllUser,
  setAllUserPage,
} = UserSlice.actions;
export default UserSlice.reducer;
