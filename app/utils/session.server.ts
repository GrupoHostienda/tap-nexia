import { createCookieSessionStorage } from "@remix-run/node";

//para crear coockie con el token
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
});

export { sessionStorage };
