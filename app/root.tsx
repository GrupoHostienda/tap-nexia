import { ReactNode, Reducer, useReducer } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
  Link,
} from "@remix-run/react";
import "./styles/index.css";
import { motion } from "framer-motion";
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
    | { type: "addItem"; payload: Item }
    | { type: "updateItem"; payload: Item }
    | { type: "deleteItem"; payload: number };

  // Define el estado inicial
  const initialState = {
    items: [],
  };

  const reducer: Reducer<State, Action> = (state: State, action: Action) => {
    switch (action.type) {
      case "addItem":
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      case "updateItem":
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
        };
      case "deleteItem":
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return <Outlet context={{ state, dispatch }} />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="  min-h-screen grid md:grid-cols-7 bg-gray-50">
        <div className=" rounded-md max-w-[37.5rem] w-[80%] mx-auto col-span-5 self-center py-8 flex flex-col gap-8">
          <motion.h1
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            className=" text-[2.5rem] leading-none sm:text-5xl lg:text-6xl font-extrabold text-center gradient-text"
          >
            There was an error
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className=" text-center "
          >
            {" "}
            <strong>Error:</strong> {error.message}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className=" py-3"
          >
            <Link
              to="/"
              className=" bg-blue-600 block text-white rounded-full py-3 px-10 hover:bg-blue-700 cursor-pointer transition text-center "
            >
              Go to Homepage
            </Link>
          </motion.div>
        </div>

        {/* Imagen lateral */}

        <div className=" md:bg-gray-800 min-h-screen hidden md:block md:col-span-2"></div>

        <button className="p-4 sm:p-5 rounded-full bg-violet-800 text-white text-xl fixed bottom-4 right-4 hover:bg-violet-700">
          <p className="w-7 h-7">?</p>
        </button>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
