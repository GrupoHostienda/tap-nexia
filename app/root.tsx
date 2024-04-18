import { ReactNode, useState } from "react";
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

export default function App() {
  const [testContext, setTestContext] = useState(false);

  /* definir todos los reducer */

  return <Outlet context={{ testContext, setTestContext }} />;
}
