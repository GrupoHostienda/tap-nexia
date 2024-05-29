/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Form, useOutletContext } from "@remix-run/react";
//import useScrollPosition from "./useScrollPosition";
import { IoMdCloseCircle } from "react-icons/io";
import { CiEdit, CiLink } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

import type { ContextType, UserLinkType } from "@/types";

import { motion } from "framer-motion";
import React, { Dispatch } from "react";

type DropDownProps = {
  setDropDown: Dispatch<React.SetStateAction<number>>;
  dropDown: number;
  dataLink: UserLinkType;
  setSelectedLinkId: React.Dispatch<number>; //***************** */
  idPosition0: number; //********************** */
};

const DropDown = ({
  setDropDown,
  dropDown,
  dataLink,
  setSelectedLinkId,
  idPosition0,
}: DropDownProps) => {
  const {
    setColor,
    setOutline,
    setShadow,
    setLinkId, //delete link
  }: //setSelectedLinkId, //edit | styles route
  //idPosition0, //edit | styles route
  ContextType = useOutletContext();

  //const scrollPosition = useScrollPosition();
  //const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  // const documentHeight =
  //  typeof document !== "undefined" ? document.documentElement.scrollHeight : 0;
  //const threshold = documentHeight - viewportHeight - 100;

  const shouldOpenUpwards = true;

  return (
    <div className="  relative ">
      {dataLink.id === dropDown && (
        <motion.div
          initial={{ y: shouldOpenUpwards ? -100 : 100 }}
          animate={{ y: -18 }}
        >
          {/* close bottom */}
          <button
            onClick={() => setDropDown(0)}
            className=" absolute scale-150 hover:text-gray-600 transition-all text-white top-5 right-2 z-20 cursor-pointer"
          >
            <IoMdCloseCircle />
          </button>
          {/* option bottoms*/}
          <div className=" absolute z-10 top-3 -left-0 min-h-44 py-2 w-52 bg-white bg-opacity-60 backdrop-blur-[0.5rem] px-2 flex flex-col justify-center gap-2 rounded-lg //*:shadow-sm //*:shadow-gray-600/[0.5] text-gray-600 *:bg-gray-200 *:px-4 *:py-1 *:rounded-full *:font-semibold">
            <div
              onClick={() => {
                setDropDown(0);
                setSelectedLinkId(dataLink.id);
                setColor("");
                setOutline("");
                setShadow("");
              }}
              className="flex justify-between items-center hover:scale-105 transition-all cursor-pointer"
            >
              <p>Edit Style</p>
              <CiEdit size={25} />
            </div>
            <div className="flex justify-between items-center hover:scale-105 transition-all cursor-pointer ">
              <p className="">Visit URL</p>
              <CiLink size={25} />
            </div>
            <div className=" hover:scale-105 transition-all cursor-pointer">
              <Form method="delete" action={`/styles`}>
                <input type="hidden" name="link-id" value={dataLink.id} />
                <button
                  onClick={() => {
                    setLinkId(dataLink.id);
                    setSelectedLinkId(idPosition0);
                    setColor("");
                    setOutline("");
                    setShadow("");
                  }}
                  className="flex justify-between items-center w-full"
                >
                  <p className="">Delete</p>
                  <MdDelete size={25} />
                </button>
              </Form>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DropDown;
