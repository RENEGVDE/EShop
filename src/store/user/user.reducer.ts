import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserState } from "../root-reducer";
import { IUser } from "../../models/IUser";

export const INITIAL_STATE: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
