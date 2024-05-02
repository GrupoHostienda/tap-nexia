import { Link, Form, useNavigation } from "@remix-run/react";

import { SocialsProvider } from "remix-auth-socials";

import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";

type ContinueWithProps = {
  action: "login" | "signup";
};

const ContinueWith = ({ action }: ContinueWithProps) => {
  const navigation = useNavigation(); //for pending state of form
  const isSubmittingWithGoogle = navigation.formAction === "/auth/google";
  return (
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
        {action === "signup"
          ? "Already have an account?"
          : "Don't have an account?"}
        <Link
          className="text-blue-600 text-sm tap"
          to={`${action === "signup" ? "/login" : "/register"}`}
        >
          {action === "signup" ? " Log in" : " Sign up"}
        </Link>
      </p>
    </motion.div>
  );
};

export default ContinueWith;
