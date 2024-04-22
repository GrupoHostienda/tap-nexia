import { ReactNode, Reducer, useReducer, useState } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./styles/index.css";

type LayoutProps = {
  children?: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body
        style={{
          fontFamily: "system-ui, sans-serif",
        }}
        className={` min-h-screen bg-center bg-no-repeat bg-cover flex flex-col justify-between gap-4`}
      >
        <div className=" flex-1">{children}</div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
//Aplica lo que te pedi antes, hacer que el state resultante sea compatible con el metodo map
export default function App() {
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
  const initialState = {
    items: [],
  };
  
  const reducer: Reducer<State, Action> = (state:State, action:Action) => {
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
  
  const [state, dispatch] = useReducer(reducer, initialState)  

  return <Outlet context={{ state, dispatch }} />;
}
