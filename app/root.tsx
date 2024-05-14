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
import TwoColGridLayout from "./components/TwoColGridLayout";
import Sidebar from "./components/SideBar";
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

  return (
    <>
      <Sidebar title="Social Media" />
      <Outlet context={{ state, dispatch }} />;
    </>
  );
}

//Error SEO
export function meta() {
  return [
    {
      title: "Hostienda | Error",
    },
    {
      name: "description",
      content: "There was an error",
    },
  ];
}

//error UI
export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <TwoColGridLayout
      stylesCol1="flex flex-col gap-8"
      stylesCol2="md:bg-gray-800"
    >
      <motion.h1
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        className=" text-[2.5rem] leading-none sm:text-5xl lg:text-6xl font-extrabold text-center gradient-text"
      >
        There was an error
      </motion.h1>

      {isRouteErrorResponse(error) && (
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className=" text-center flex flex-col font-semibold "
        >
          <span>
            Status: {error.status} {error.statusText}
          </span>
          {error.data}
        </motion.p>
      )}

      {error instanceof Error && (
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className=" text-center "
        >
          {" "}
          <strong>Error:</strong> {error.message}
        </motion.p>
      )}

      {!(error instanceof Error) && !isRouteErrorResponse(error) && (
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className=" text-center "
        >
          Unknown error
        </motion.p>
      )}

      {/* go to styles */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className=" py-3"
      >
        <Link
          to="/styles"
          className=" bg-blue-600 block text-white rounded-full py-3 px-10 hover:bg-blue-700 cursor-pointer transition text-center "
        >
          Go to Styles
        </Link>
      </motion.div>
    </TwoColGridLayout>
  );
}
