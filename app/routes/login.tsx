import { Link } from "@remix-run/react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import PasswordTypeToggle from "@/components/PasswordToggleIcon";

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

const disable = true;

export default function loginLayout() {
  const [PasswordInputType, ToggleIcon] = PasswordTypeToggle();

  return (
    <>
      <div className="w-screen h-screen bg-gray-50 fixed left-0">
        {/* Formulario */}
        <div className="absolute top-[15%] left-[10%] md:w-[48%] w-[80%]">
          <form action="#" className="grid grid-cols-1 gap-10">
            <div className=" flex flex-col gap-1">
              <h1 className=" text-4xl font-extrabold text-center px-2 pt-2">
                Welcome Back
              </h1>
              <h2 className="text-sm text-center text-gray-500 font-medium">
                Log into your account
              </h2>
            </div>

            <div className=" flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email or username"
                className="input z-10"
              />
              <div className="bg-gray-200 rounded-md flex items-center w-full">
                <input
                  type={`${PasswordInputType}`}
                  placeholder="password"
                  className="input relative w-full z-10"
                  name=""
                  id=""
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
            </div>

            <div className=" flex flex-col gap-3">
              <input
                type="submit"
                value="Log in"
                className={`bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 cursor-pointer transition ${
                  disable &&
                  "bg-gray-400 opacity-80 text-gray-700 tap hover:bg-gray-400"
                } `}
              />
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
            </div>
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
