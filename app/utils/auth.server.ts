import { Authenticator } from "remix-auth";
import { sessionStorage } from "@/utils/session.server";
import { GoogleStrategy, SocialsProvider } from "remix-auth-socials";
import { redirect } from "@remix-run/node";

// Create an instance of the authenticator, pass a generic with what
export const authenticator = new Authenticator(sessionStorage);

type GoogleProfileType = {
  provider: string;
  id: string;
  displayName: string;
  name: { familyName: string; givenName: string };
  emails: [{ value: string }];
  photos: [
    {
      value: string;
    }
  ];
  _json: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
  };
  token?: string;
};

async function handleSocialAuthCallback({
  profile,
}: {
  profile: GoogleProfileType;
}) {
  // Registrar al usuario
  let response = await fetch(`${process.env.API_BASE}/register/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: profile.displayName,
      email: profile.emails[0].value,
      password: profile.id,
    }),
  });

  let data = await response.json();

  // Evalúa la respuesta del registro
  if (response.ok) {
    console.log("User registered successfully.");
  } else if (
    !response.ok &&
    (data.message.includes("The email has already been taken.") ||
      data.message.includes("The username has already been taken."))
  ) {
    console.log("User already exists. Attempting to log in.");
  } else {
    throw new Error("Error registering the user.");
  }

  // Proceso de login (tanto para usuarios recién registrados como para usuarios existentes)
  response = await fetch(`${process.env.API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: profile.emails[0].value,
      password: profile.id,
    }),
  });

  data = await response.json();
  if (!response.ok) {
    throw new Error("Login error: " + data.message);
    return redirect("/error"); // ******************************************************************************
  }

  // Configuracion la sesión después de todas las validaciones
  const session = await sessionStorage.getSession();
  session.set("authToken", data.token);
  const cookieHeader = await sessionStorage.commitSession(session);

  return redirect("/", {
    headers: { "Set-Cookie": cookieHeader },
  });
}

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

// Verify that the necessary environment variables are defined
if (!clientID || !clientSecret) {
  throw new Error("Google client ID and secret must be defined");
}

authenticator.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      scope: ["openid email profile"],
      callbackURL: `${process.env.DOMAIN}/auth/${SocialsProvider.GOOGLE}/callback`,
    },
    handleSocialAuthCallback
  )
);
