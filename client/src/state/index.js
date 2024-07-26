import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  mode: "light",
  posts: [],
  friends: [],
  garage: [],
  showroom: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setMode: (state, action) => {
      state.mode = action.payload.mode;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const index = state.posts.findIndex((post) => post._id === action.payload._id);
      if (index !== -1) {
        state.posts[index] = action.payload.post;
      }
    },
    setFriends: (state, action) => {
      state.friends = action.payload.friends;
    },
    setGarage: (state, action) => {
      state.garage = action.payload.garage;
    },
    setShowroom: (state, action) => {
      state.showroom = action.payload.showroom;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setMode,
  setPosts,
  setPost,
  setFriends,
  setGarage,
  setShowroom,
} = authSlice.actions;

export default authSlice.reducer;
