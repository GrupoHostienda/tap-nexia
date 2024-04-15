import { Link } from "@remix-run/react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import PasswordTypeToggle from "@/components/Login/PasswordToggleIcon";
import { useState } from "react";
import Error from "@/components/Error";
import { motion } from "framer-motion";

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

type FormData = {
  email: string;
  password: string;
};

type FormDataError = {
  email: boolean;
  password: boolean;
};

export default function LoginPage() {
  const [PasswordInputType, ToggleIcon] = PasswordTypeToggle();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState<FormDataError>({
    email: false,
    password: false,
  });

  const [correoValido, setCorreoValido] = useState(true);

  const [submitted, setSumitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email: FormData["email"]) => {
    // Expresión regular para validar el formato de correo electrónico
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    console.log("submitted");

    // Validación de campos
    const errors = {
      email: formData.email.trim() === "",
      password: formData.password.trim() === "",
    };

    setFormError(errors);

    // Validación de correo electrónico
    const isValidEmail = validateEmail(formData.email);
    setCorreoValido(isValidEmail);

    //enviar form si los campos estan correctos
    if (!errors.email && !errors.password && isValidEmail) {
      try {
        setSumitted(true);
        setTimeout(() => {
          setSumitted(false);
        }, 5000);

        setFormData({
          email: "",
          password: "",
        });
      } catch (error) {
        console.log("error:", error);
      }
    }
  };

  return (
    <>
      <div className=" min-h-screen grid md:grid-cols-7 bg-gray-50">
        {/* Formulario */}
        <div className=" max-w-[37.5rem] w-[80%] mx-auto col-span-5 self-center py-8 ">
          <form action="#" className="grid grid-cols-1 gap-6">
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
                placeholder="Email or username"
                className="input z-10"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {!formError.email && !correoValido && (
                <Error>Introduzca un email valido</Error>
              )}
              <div className="bg-gray-200 rounded-md flex items-center w-full relative">
                <input
                  formNoValidate
                  type={`${PasswordInputType}`}
                  placeholder="password"
                  className="input relative w-full z-10"
                  value={formData.password}
                  name="password"
                  onChange={handleInputChange}
                />
                <div className=" absolute right-3 z-20">{ToggleIcon}</div>
              </div>

              {(formError.email || formError.password) && (
                <Error>Todos los campos son obligatorios</Error>
              )}

              {submitted && (
                <p className=" text-white bg-green-500 p-2 text-center capitalize font-semibold rounded-md">
                  Form enviada con exito
                </p>
              )}

              <div className="flex gap-3">
                <Link className="text-blue-600 text-sm z-10 tap" to="#">
                  Forgot your password?
                </Link>
                <Link className="text-blue-600 text-sm tap" to="#">
                  Forgot your username?
                </Link>
              </div>
            </motion.div>

            <div className=" flex flex-col gap-3">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15,
                }}
                className=""
              >
                <input
                  type="submit"
                  value="Log in"
                  className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 cursor-pointer transition z-10 w-full"
                  onClick={handleSubmit}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                }}
                className="flex flex-col gap-3"
              >
                <p className="text-center text-gray-500 font-medium">OR</p>
                <button className="border border-gray-300 rounded-full p-2 flex justify-center items-center gap-3 hover:bg-gray-100 tap">
                  <FcGoogle className="text-2xl" />
                  <p className="font-semibold">Continue with Google</p>
                </button>
                <button className="border border-gray-300 rounded-full p-2 flex justify-center items-center gap-3 hover:bg-gray-100 tap">
                  <FaApple className="text-2xl" />
                  <p className="font-semibold">Continue with Apple</p>
                </button>
                <p className="text-center text-sm text-gray-500 font-medium">
                  Don&apos;t have an account?{" "}
                  <Link className="text-blue-600 text-sm tap" to="#">
                    Sign up
                  </Link>
                </p>
              </motion.div>
            </div>
          </form>
        </div>

        {/* Imagen lateral */}

        <div className=" md:bg-gray-800 min-h-screen hidden md:block md:col-span-2"></div>

        <button className="p-4 sm:p-5 rounded-full bg-violet-800 text-white text-xl fixed bottom-4 right-4 hover:bg-violet-700">
          <p className="w-7 h-7">?</p>
        </button>
      </div>
    </>
  );
}
