/* eslint-disable react/prop-types */
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";


import "./styles/index.css";

export function Layout({ children }) {
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
          fontFamily: "system-ui, sans-serif", //font
        }}
        className={` min-h-screen bg-center bg-no-repeat bg-cover flex flex-col justify-between gap-4 max-w-3xl mx-auto px-4 sm:px-6`}
      >

        {/* content */}
        <div className=" flex-1">{children}</div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
