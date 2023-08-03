import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICartState } from "../root-reducer";
import { IItem } from "../../models/IItem";

export const CART_INITIAL_STATE: ICartState = {
  isCartOpen: false,
  cartItems: [],
};

const addCartItem = (cartItems: IItem[], item: IItem): IItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === item.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem: IItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...item, quantity: 1 }];
};

const removeCartItem = (cartItems: IItem[], item: IItem): IItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === item.id
  );

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== item.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === item.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems: IItem[], item: IItem): IItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== item.id);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    addItemToCart: (state, action: PayloadAction<IItem>) => {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart: (state, action: PayloadAction<IItem>) => {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart: (state, action: PayloadAction<IItem>) => {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },
  },
});

export const {
  setIsCartOpen,
  // setCartItems,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
