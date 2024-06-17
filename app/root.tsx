import { ReactNode, useEffect, useState } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
  Link,
  useNavigation,
} from "@remix-run/react";
import "./styles/index.css";
import { motion } from "framer-motion";
import TwoColGridLayout from "./components/TwoColGridLayout";

//type
type LayoutProps = {
  children?: ReactNode;
};

//layout
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
        className={` min-h-screen bg-gray-200 bg-center bg-no-repeat bg-cover flex flex-col justify-between gap-4`}
      >
        <div className=" flex-1">{children}</div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

//app
export default function App() {
  /*  const [color, setColor] = useState("");
  const [outline, setOutline] = useState("");
  const [shadow, setShadow] = useState(""); */

  const [background, setBackground] = useState(""); //bg-preview
  const [bgToDBId, setBgToDBId] = useState<number | null>(null); //bg-preview

  const navigation = useNavigation();

  const [linkId, setLinkId] = useState(0); //for showing user deleting message

  //bg-preview
  useEffect(() => {
    if (navigation.formMethod !== "POST") {
      setBackground("");
      setBgToDBId(null);
    }
  }, [navigation.location?.pathname, navigation.formMethod]);

  return (
    <Outlet
      context={{
        /*     color,
        setColor,
        outline,
        setOutline,
        shadow,
        setShadow, */
        linkId,
        setLinkId, // delete | DropDrown component
        background,
        setBackground,
        bgToDBId, // bg | Preview component
        setBgToDBId,
      }}
    />
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

      {/* go to preview */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className=" py-3"
      >
        <Link
          to="/preview"
          className=" bg-blue-600 block text-white rounded-full py-3 px-10 hover:bg-blue-700 cursor-pointer transition text-center "
        >
          Go to Preview
        </Link>
      </motion.div>
    </TwoColGridLayout>
  );
}
