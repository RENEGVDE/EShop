import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategoriesState } from "../root-reducer";
import { ICategory } from "../../models/ICategory";

export const CATEGORIES_INITIAL_STATE: ICategoriesState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
