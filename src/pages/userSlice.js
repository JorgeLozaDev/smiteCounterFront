import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    credentials: "",
    editedListId: null,
    editUserId: null,
  },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logout: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setEditedListId: (state, action) => {
      state.editedListId = action.payload;
    },

    setEditUserId: (state, action) => {
      state.editedListId = action.payload;
    },
  },
});

export const { login, logout, setEditedListId, setEditUserId } =
  userSlice.actions;
export const userDetails = (state) => state.user;
export default userSlice.reducer;
