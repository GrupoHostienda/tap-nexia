import LinksContainer from "@/components/LinksContainer";
import SocialsContainer from "@/components/SocialsContainer";
//import SideBar from "@/components/SideBar";
import data from "data.json";
import { motion } from "framer-motion";
import { useState } from "react";

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

export default function Index() {
  const [iFrameVisible, setIframeVisible] = useState(false);

  return (
    <div className="flex flex-col gap-10 pt-20 ">
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

      {/*   Necesito esto acá para que la animacion de framer motion funcione bien*/}
      <div className=" select-none rounded-full opacity-[0.001] text-sm flex justify-center items-center">
        animation fix | looks like I need some content at the end to make it
        work
      </div>

      {/*  <SideBar title="Sidebar">
        <a
          href="#d"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Link 1
        </a>
        <a
          href="#d"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Link 2
        </a>
        <a
          href="#d"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Link 3
        </a>
      </SideBar> */}
    </div>
  );
}
