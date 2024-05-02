import { createCookieSessionStorage } from "@remix-run/node";

//para crear coockie con el token
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["s3cret1"],
    secure: process.env.NODE_ENV === "production",
  },
});

export { sessionStorage };
