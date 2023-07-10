import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, item) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id)

    if (existingCartItem) {
        return cartItems.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
    }

    return [...cartItems, { ...item, quantity: 1 }]
}

const removeCartItem = (cartItems, item) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === item.id)

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== item.id)
    }

    return cartItems.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
}

const clearCartItem = (cartItems, item) => {
    return cartItems.filter(cartItem => cartItem.id !== item.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    total: 0
})

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    total: 0
}

const cartReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'SET_CART_ITEMS':
            return {
                ...state,
                ...payload
            }
        case 'SET_IS_CART_OPEN':
            return {
                ...state,
                ...payload
            }
        default:
            throw new Error(`Unknown action type: ${type}`)
    }
}

export const CartProvider = ({ children }) => {
    const [{ cartItems, cartCount, total, isCartOpen }, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, item) => total + item.quantity, 0)

        const newTotal = newCartItems.reduce((total, item) => total + item.quantity * item.price, 0)

        dispatch(
            createAction('SET_CART_ITEMS', {
                cartItems: newCartItems,
                cartCount: newCartCount,
                total: newTotal
            })
        )
    }

    const addItemToCart = (item) => {
        const newCartItems = (addCartItem(cartItems, item))
        updateCartItemsReducer(newCartItems)
    }

    const removeItemFromCart = (item) => {
        const newCartItems = removeCartItem(cartItems, item)
        updateCartItemsReducer(newCartItems)
    }

    const clearItemFromCart = (item) => {
        const newCartItems = clearCartItem(cartItems, item)
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (isOpen) => {
        dispatch(
            createAction('SET_IS_CART_OPEN', { isCartOpen: isOpen })
        )
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartCount, total }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}