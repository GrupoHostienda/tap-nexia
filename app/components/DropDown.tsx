import { Form, Link, useLocation, useOutletContext } from "@remix-run/react";
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
};

const DropDown = ({ setDropDown, dropDown, dataLink }: DropDownProps) => {
  const location = useLocation();

  const {
    setLinkId, //delete link
  }: ContextType = useOutletContext();

  return (
    <div className="  relative ">
      {dataLink.id === dropDown && (
        <motion.div initial={{ y: -100 }} animate={{ y: -18 }}>
          {/* close bottom */}
          <button
            onClick={() => setDropDown(0)}
            className=" absolute scale-150 hover:text-gray-600 transition-all text-white top-5 right-2 z-20 cursor-pointer"
          >
            <IoMdCloseCircle />
          </button>

          {/* option bottoms*/}
          <div className=" absolute z-10 top-3 -left-0 min-h-44 py-2 w-52 bg-white bg-opacity-60 backdrop-blur-[0.5rem] px-2 flex flex-col justify-center gap-2 rounded-lg //*:shadow-sm //*:shadow-gray-600/[0.5] text-gray-600 *:bg-gray-200 *:px-4 *:py-1 *:rounded-full *:font-semibold">
            <Link
              to={`/back-office/edit/${dropDown}`}
              onClick={() => {
                setDropDown(0);
              }}
              className="flex justify-between items-center hover:scale-105 transition-all cursor-pointer"
            >
              <span>Edit Style</span>
              <CiEdit size={25} />
            </Link>
            <Link
              to={dataLink.url}
              target="_blank"
              rel="noreferrer"
              className="flex justify-between items-center hover:scale-105 transition-all cursor-pointer "
            >
              <p className="">Visit URL</p>
              <CiLink size={25} />
            </Link>
            <Form
              method="delete"
              action={`${location.pathname}`}
              className=" hover:scale-105 transition-all cursor-pointer"
            >
              <input type="hidden" name="link-id" value={dataLink.id} />
              <button
                onClick={() => {
                  setLinkId(dataLink.id); //delete
                }}
                className="flex justify-between items-center w-full"
              >
                <p className="">Delete</p>
                <MdDelete size={25} />
              </button>
            </Form>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DropDown;
