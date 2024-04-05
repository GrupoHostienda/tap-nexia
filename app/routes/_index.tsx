import LinksContainer from "@/components/LinksContainer";
import SocialsContainer from "@/components/SocialsContainer";
import Sidebar from "@/components/SIdeBar";
import Iframe from "@/components/Iframe";
import data from "data.json";
import { motion } from "framer-motion";

/* function for meta data, for improving SEO */
export function meta() {
  return [
    {
      title: "Landing - Page",
    },
    {
      name: "description",
      content: "Landing - Page",
    },
  ];
}

export default function Index() {
  return (
    <div className="flex flex-col gap-10 pt-20 ">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className=" flex flex-col gap-2"
      >
        <img
          src={data.avatar}
          alt="avatar"
          className=" bg-slate-100 rounded-[50%] w-24 h-24 object-cover mx-auto border-2 border-solid border-slate-200 "
        />
        <div className=" text-center capitalize text-slate-200">
          <h2 className="  text-3xl font-bold">{data.name}</h2>
          <p className=" text-lg ">{data.desc}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <LinksContainer />
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className=" text-white  text-2xl text-center capitalize flex //flex-col justify-center gap-2 //mb-14"
      >
        <SocialsContainer />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1,
          duration: 0.5,
        }}
      >
        <Iframe />
      </motion.div>

      {/*   Necesito esto acá para que la animacion de framer motion funcione bien*/}
      <div className=" select-none rounded-full opacity-[0.001] text-sm flex justify-center items-center">
        animation fix | looks like I need some content at the end to make it
        work
      </div>

      <LinksContainer />

      <SocialsContainer />

      <Sidebar title="Sidebar">
        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Link 1</a>
        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Link 2</a>
        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Link 3</a>
      </Sidebar>
    </div>
  );
}
