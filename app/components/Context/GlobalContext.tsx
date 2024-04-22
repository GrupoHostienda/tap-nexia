import { useOutletContext } from "@remix-run/react";
import { Reducer, useReducer } from "react";
// Definir tipos
interface Item {
  id: number;
  title: string;
  url: string;
}
interface State {
  items: Item[];
}

type Action =
  | { type: 'addItem'; payload: Item }
  | { type: 'updateItem'; payload: Item }
  | { type: 'deleteItem'; payload: number };

// Define el estado inicial
const initialState: State = {
  items: [],
};

export const reducer: Reducer<State, Action> = (state:State, action:Action) => {
  switch (action.type) {
  case 'addItem':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'updateItem':
      return {
        ...state,
        items: state.items.map(item => (item.id === action.payload.id ? action.payload : item)),
      };
    case 'deleteItem':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
}

// {
//   state: initialState,
//   dispatch: () => null,
// }

// export const [state, dispatch] = useReducer(reducer, initialState)
