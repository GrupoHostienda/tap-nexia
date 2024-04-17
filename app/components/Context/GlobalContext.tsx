import React, { ReactNode, useReducer, createContext, useContext } from 'react';

interface GlobalState {
  items: Item[];
}

export interface Item {
  id: number;
  text: string;
  url: string;
}

type Action =
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_ITEM'; payload: { id: number; updatedData: Partial<Item> } };

type ContextProvider = {
  state: GlobalState;
  dispatch: React.Dispatch<Action>
}

type ContextProps =  { children: ReactNode }

const initialState: GlobalState = {
  items: []
};

const GlobalStateContext = createContext<ContextProvider>({ state: initialState, dispatch: () => null });

const reducer = (state: GlobalState, action: Action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, ...action.payload.updatedData } : item
        )
      };
    default:
      return state;
  }
};

export const GlobalStateProvider = ({ children }:ContextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error('useGlobalState debe ser usado dentro de un GlobalStateProvider');
  }

  return context;
};
