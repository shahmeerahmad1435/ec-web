import React, { createContext, Dispatch, useReducer } from 'react';
import Cookies from 'js-cookie';

type ProductType = {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: string;
  numReviews: string;
  countInStock: number;
  description: string;
  quantity?: number;
};

type CartState = {
  cart: { cartItems: ProductType[] };
};

const initialState: any = {
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart') ?? '{}')
    : { cartItems: [] },
};

type CartAction = { type: string; payload: any };

export const shoppingCartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case 'ADD_CART': {
      const newItem = action.payload;
      const existItems = state.cart.cartItems.find(
        (item: { slug: string }) => item.slug === newItem.slug
      );
      const cartItems = existItems
        ? state.cart.cartItems.map((item) =>
            item.name === existItems.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: CartState;
  dispatch: Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export function AppProvider({ children }: any) {
  const [state, dispatch] = useReducer(shoppingCartReducer, initialState);
  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
