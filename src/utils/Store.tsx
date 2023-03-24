import { useReducer, useContext, createContext } from "react"
import type { ReactNode } from "react"
import data from "./data";
export const Store = createContext(undefined);
const initialState = {
    cart: { cartItems: [] }
}
// export type PayLoad = typeof data.product
export type Action = { type: 'CART_ADD_ITEM', payload: [] }
export type State = typeof initialState
export type Dispatch = (action: Action) => void
export type Product = {
    slug: string,
    name: string
}



// function reducer(state: State, action: Action) {
//     switch (action.type) {
//         case 'CART_ADD_ITEM':
//             const newItem = action.payload;
//             const existItem = state.cart.cartItems.find((item: Product) => item.slug === newItem.slug)
//             const cartItems = existItem ? state.cart.cartItems.map((item: Product) => item.name === existItem.name ? newItem : item) : [...state.cart.cartItem, newItem]
//             return { ...state, cart: { ...state.cart, cartItems } }


//         default:
//             return state;

//     }
// }

// export function StoreProvider({ children }: any) {
//     const [state, dispatch] = useReducer(reducer, initialState)
//     const value = { state, dispatch }
//     return <Store.Provider value={value}>
//         {children}
//     </Store.Provider>
// }









