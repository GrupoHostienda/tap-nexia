import { Link } from "@remix-run/react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import PasswordTypeToggle from "@/components/PasswordToggleIcon";

export function meta() {
  return [
    {
      title: "Login - Page",
    },
    {
      name: "description",
      content: "Login - Page",
    },
  ];
}

export default function loginLayout() {
  const [PasswordInputType, ToggleIcon] = PasswordTypeToggle();

  return (
    <>
      <div className="w-screen h-screen bg-gray-50 fixed left-0">
        {/* Formulario */}
        <div className="absolute top-[8%] left-[10%] md:w-[48%] sm:w-[80%] h-[70%] p-5">
          <form action="#" className="grid grid-cols-1 gap-2">
            <h1 className=" text-4xl text-center px-2 pt-2 font-bold">
              Welcome Back
            </h1>
            <h2 className="text-sm text-center">Log into your account</h2>

            <input
              type="email"
              placeholder="Email or username"
              className="bg-gray-200 p-2 px-4 rounded-md "
              name=""
              id=""
            />
            <div className="bg-gray-200 rounded-md flex items-center w-full">
              <input
                type={`${PasswordInputType}`}
                placeholder="password"
                className="bg-transparent p-2 px-4 rounded-md w-[90%]"
                name=""
                id=""
              />
              {ToggleIcon}
            </div>

            <div className="flex gap-3">
              <Link className="text-blue-600 text-sm" to="#">
                Forgot your password?
              </Link>
              <Link className="text-blue-600 text-sm" to="#">
                Forgot your username?
              </Link>
            </div>
            <input
              type="submit"
              value="Log in"
              className={`bg-blue-600 text-white rounded-full p-3 hover:bg-blue-400 cursor-pointer ${""}`}
            />
            <p className="text-center">Or</p>
            <button className="border border-gray-300 rounded-full p-2 flex justify-center items-center gap-3 hover:bg-gray-100">
              <FcGoogle className="text-2xl" />
              <p className="font-semibold">Continue with Google</p>
            </button>
            <button className="border border-gray-300 rounded-full p-2 flex justify-center items-center gap-3 hover:bg-gray-100">
              <FaApple className="text-2xl" />
              <p className="font-semibold">Continue with Apple</p>
            </button>
            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link className="text-blue-600 text-sm" to="#">
                Sign up
              </Link>
            </p>
          </form>
        </div>
        {/* Imagen lateral */}
        <div className="absolute md:bg-gray-800 h-screen w-1/3 md:right-0 sm:bg-transparent">
          <button className="p-5 rounded-full bg-violet-800 text-white text-xl fixed bottom-4 right-4 hover:bg-violet-700">
            <p className="w-7 h-7">?</p>
          </button>
        </div>
      </div>
    </>
  );
}
