import { useState } from "react";
import data from "data.json";
import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { sessionStorage } from "@/utils/session.server";

import { motion } from "framer-motion";

import LinksContainer from "@/components/LinksContainer";
import SocialsContainer from "@/components/SocialsContainer";
import Sidebar from "@/components/SIdeBar";
import { useOutletContext } from "@remix-run/react";

/* function for meta data, for improving SEO */
export function meta() {
  return [
    {
      title: "Hostienda | Homepage",
    },
    {
      name: "description",
      content: "Home page",
    },
  ];
}

// loader para verificar sesión
export const loader = async ({ request }: ActionFunctionArgs) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const authToken = session.get("authToken");

  if (!authToken) {
    return redirect("/login");
  }

  return null; // no hay sesión activa, seguir con el renderizado normal
};

// type OutletContextProps = {
//   testContext: boolean;
//   setTestContext: React.Dispatch<React.SetStateAction<boolean>>;
// };

export default function Index() {
  const [iFrameVisible, setIframeVisible] = useState(false);

  // const { testContext, setTestContext } =
  //   useOutletContext<OutletContextProps>();

  // const toggleTestContext = () => {
  //   setTestContext((prev) => !prev);
  // };

  return (
    <div className=" bg-home min-h-screen">
      <div className="flex flex-col gap-10 pt-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center flex-col gap-2">
          <div className=" relative ">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "tween",
                duration: 0.2,
              }}
            >
              <img
                src={data.avatar}
                alt="avatar"
                className=" bg-slate-100 rounded-[50%] w-24 h-24 object-cover mx-auto border-2 border-solid border-slate-200 "
              />
            </motion.div>
    <div className="flex flex-col gap-10 pt-20 max-w-3xl mx-auto px-4 sm:px-6">
      <div className="flex items-center justify-center flex-col gap-2">
        {/* <div className=" bg-white p-2 w-full text-center">
          <button
            className=" bg-gray-400  px-4 py-2 rounded-lg hover:bg-gray-500 hover:scale-105 active:scale-100 transition-all"
            onClick={toggleTestContext}
          >
            {" "}
            toggle textContext
          </button>
          <p>{`toggle is ${testContext}`}</p>
        </div> */}
        <div className=" relative ">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          >
            <img
              src={data.avatar}
              alt="avatar"
              className=" bg-slate-100 rounded-[50%] w-24 h-24 object-cover mx-auto border-2 border-solid border-slate-200 "
            />
          </motion.div>

            <motion.span
              className="absolute bottom-0 right-0 text-4xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 125,
                delay: 0.1,
                duration: 0.7,
              }}
            >
              👋
            </motion.span>
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className=" text-center capitalize text-slate-200"
          >
            <h2 className="  text-3xl font-bold">{data.name}</h2>
            <p className=" text-lg ">{data.desc}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <LinksContainer
            setIframeVisible={setIframeVisible}
            iFrameVisible={iFrameVisible}
          />
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className=" text-white  text-2xl text-center capitalize flex //flex-col justify-center gap-2 //mb-14"
        >
          <SocialsContainer />
        </motion.div>
        <Sidebar title="Social Media" />
      </div>
    </div>
  );
}
