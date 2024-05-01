import { useState, useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Form, useActionData, useNavigation } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

import { validateEmail } from "@/utils/helpers";
import { sessionStorage } from "@/utils/session.server";

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { motion } from "framer-motion";

import PasswordTypeToggle from "@/components/Login/PasswordToggleIcon";
import Error from "@/components/Error";

import { SocialsProvider } from "remix-auth-socials";

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
    return json({ error: "Todos los campos son obligatorios." });
  }

  //formato valido de correo
  if (!validateEmail(email)) {
    return json({
      error: "formato de correo no válido.",
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

  return redirect("/", {
    headers: {
      "Set-Cookie": cookieHeader,
    },
  });
};

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation(); //for pending state of form
  const isSubmitting = navigation.formAction === "/login";
  const isSubmittingWithGoogle = navigation.formAction === "/auth/google";

  const [PasswordInputType, ToggleIcon] = PasswordTypeToggle();

  const [errorMessage, setErrorMessage] = useState("");

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
    <div className=" min-h-screen grid md:grid-cols-7 bg-gray-50">
      <div className=" max-w-[37.5rem] w-[80%] mx-auto col-span-5 self-center py-8 ">
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
              <Error>usuario no valido</Error>
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

        {/* continue with... */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
          }}
          className="flex flex-col gap-3 mt-3"
        >
          <p className="text-center text-gray-500 font-medium">OR</p>

          <Form method="post" action={`/auth/${SocialsProvider.GOOGLE}`}>
            <button
              disabled={isSubmittingWithGoogle}
              className=" w-full border border-gray-300 rounded-full p-2 flex justify-center items-center gap-3 hover:bg-gray-100 tap"
            >
              <FcGoogle className="text-2xl" />
              <p className="font-semibold">
                {isSubmittingWithGoogle ? "Loading..." : "Continue with Google"}
              </p>
            </button>
          </Form>
          <Form>
            <button className=" w-full border border-gray-300 rounded-full p-2 flex justify-center items-center gap-3 hover:bg-gray-100 tap">
              <FaApple className="text-2xl" />
              <p className="font-semibold">Continue with Apple</p>
            </button>{" "}
          </Form>

          <p className="text-center text-sm text-gray-500 font-medium">
            Don&apos;t have an account?{" "}
            <Link className="text-blue-600 text-sm tap" to="/register">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Imagen lateral */}
      <div className=" md:bg-gray-800 min-h-screen hidden md:block md:col-span-2"></div>
      <button className="p-4 sm:p-5 rounded-full bg-violet-800 text-white text-xl fixed bottom-4 right-4 hover:bg-violet-700">
        <p className="w-7 h-7">?</p>
      </button>
    </div>
  );
}
