import { useState, useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  Form,
  useActionData,
  useNavigation,
  useLocation,
} from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

import { validateEmail } from "@/utils/helpers";
import { sessionStorage } from "@/utils/session.server";

import { motion } from "framer-motion";

import PasswordTypeToggle from "@/components/Login/PasswordToggleIcon";
import Error from "@/components/ErrorMessage";
import TwoColGridLayout from "@/components/TwoColGridLayout";
import ContinueWith from "@/components/Login/ContinueWith";

export function meta() {
  return [
    {
      title: "Hostienda | Login",
    },
    {
      name: "description",
      content: "Login Page",
    },
  ];
}

// loader para verificar sesión
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const authToken = session.get("authToken");

  // console.log(authToken);

  if (authToken) {
    return redirect("/");
  }

  return null; // no hay sesión activa, seguir con el renderizado normal
};

/* action para la form login */
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  //campos no vacios
  if (email.trim() === "" || password.trim() === "") {
    return json({ error: "All fields are required." });
  }

  //formato valido de correo
  if (!validateEmail(email)) {
    return json({
      error: "Not valid email.",
    });
  }

  const response = await fetch(`${process.env.API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return json({ error: data.error });
  }

  // Configuracion la sesión después de todas las validaciones
  const session = await sessionStorage.getSession();
  session.set("authToken", data.token);

  const cookieHeader = await sessionStorage.commitSession(session);

  return redirect("/styles", {
    headers: {
      "Set-Cookie": cookieHeader,
    },
  });
};

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation(); //for pending state of form
  const isSubmitting = navigation.formAction === "/login";

  const [PasswordInputType, ToggleIcon] = PasswordTypeToggle();

  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (actionData?.error) {
      setErrorMessage(actionData.error);

      const timer = setTimeout(() => {
        setErrorMessage(""); // Limpia el mensaje de error después de 4 segundos
      }, 4000);

      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }
  }, [actionData]);

  return (
    <TwoColGridLayout stylesCol2="md:bg-gray-800" location={location.pathname}>
      {/* Formulario */}
      <Form method="post" noValidate className="grid grid-cols-1 gap-6">
        <motion.h1
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          className=" text-[2.5rem] whitespace-nowrap sm:text-5xl lg:text-6xl font-extrabold text-center px-2 pt-2 gradient-text"
        >
          Welcome Back
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className=" flex flex-col gap-3"
        >
          <h2 className="text-sm text-center text-gray-500 font-medium">
            Log into your account
          </h2>
          <input
            formNoValidate
            type="email"
            placeholder="Email"
            className="input z-10"
            name="email"
          />

          <div className="bg-gray-200 rounded-md flex items-center w-full relative">
            <input
              formNoValidate
              type={`${PasswordInputType}`}
              placeholder="password"
              className="input relative w-full z-10"
              name="password"
            />
            <div className=" absolute right-3 z-20">{ToggleIcon}</div>
          </div>

          <div className="flex gap-3">
            <Link className="text-blue-600 text-sm z-10 tap" to="#">
              Forgot your password?
            </Link>
            <Link className="text-blue-600 text-sm tap" to="#">
              Forgot your username?
            </Link>
          </div>
        </motion.div>

        {errorMessage &&
          actionData?.error &&
          (actionData?.error === "Unauthorized" ? (
            <Error>Not Valid User</Error>
          ) : (
            <Error>{actionData?.error}</Error>
          ))}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.15,
          }}
        >
          <input
            type="submit"
            value={isSubmitting ? "Loading..." : "Log in"}
            className=" bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 cursor-pointer transition z-10 w-full"
            disabled={isSubmitting}
          />
        </motion.div>
      </Form>

      <ContinueWith action="login" />
    </TwoColGridLayout>
  );
}
