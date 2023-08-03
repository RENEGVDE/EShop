import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { IUser } from "../models/IUser";
import { ICategory } from "../models/ICategory";
import { IItem } from "../models/IItem";

export interface IRootState {
  user: IUserState;
  categories: ICategoriesState;
  cart: ICartState;
}
export interface IUserState {
  user: IUser | null;
}

export interface ICategoriesState {
  categories: ICategory[];
}

export interface ICartState {
  isCartOpen: boolean;
  cartItems: IItem[];
}

export const rootReducer = combineReducers<IRootState>({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
