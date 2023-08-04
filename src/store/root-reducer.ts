import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { IUser } from "../models/IUser";
import { ICategory } from "../models/ICategory";
import { IItem } from "../models/IItem";

export interface IRootState {
  readonly user: IUserState;
  readonly categories: ICategoriesState;
  readonly cart: ICartState;
}
export interface IUserState {
  readonly user: IUser | null;
}

export interface ICategoriesState {
  readonly categories: ICategory[];
}

export interface ICartState {
  readonly isCartOpen: boolean;
  readonly cartItems: IItem[];
}

export const rootReducer = combineReducers<IRootState>({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
