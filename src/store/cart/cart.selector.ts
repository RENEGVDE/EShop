import { createSelector } from "reselect";
import { ICartState, IRootState } from "../root-reducer";
import { IItem } from "../../models/IItem";

const selectCartReducer = (state: IRootState): ICartState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart: ICartState): IItem[] => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart: ICartState): boolean => cart.isCartOpen
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems: IItem[]): number =>
    cartItems.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems: IItem[]): number =>
    cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
);
