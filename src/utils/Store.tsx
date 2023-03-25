import { createContext, Dispatch, useReducer } from 'react';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  Add = 'ADD_PRODUCT',
}

// ShoppingCart

type ShoppingCartPayload = {
  [Types.Add]: undefined;
};

export type ShoppingCartActions =
  ActionMap<ShoppingCartPayload>[keyof ActionMap<ShoppingCartPayload>];

export const shoppingCartReducer = (
  state: number,
  action: ShoppingCartActions
) => {
  switch (action.type) {
    case Types.Add:
      return state + 1;
    default:
      return state;
  }
};

type InitialStateType = {
  shoppingCart: number;
};

const initialState = {
  shoppingCart: 0,
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ShoppingCartActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { shoppingCart }: InitialStateType,
  action: ShoppingCartActions
) => ({
  shoppingCart: shoppingCartReducer(shoppingCart, action),
});

const AppProvider: any = ({ children }: any) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
