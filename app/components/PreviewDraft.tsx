import { useNavigation, useOutletContext } from "@remix-run/react";

import type { ContextType, UserLinkType, UserType } from "@/types";

import { useState } from "react";

import DropDown from "./DropDown";

import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { motion } from "framer-motion";

import { twMerge } from "tailwind-merge";

//type
type PreviewProps = {
  data: UserLinkType[];
  user: UserType;
  selectedLink: UserLinkType;
  setSelectedLinkId: React.Dispatch<number>;
  idPosition0: number;
};

//component
function Preview({
  data,
  user,
  selectedLink, //flag of selected link
  setSelectedLinkId, //for setting flag of selected link
  idPosition0, //para colocar el id default si borro el link que estoy editando
}: PreviewProps) {
  const navigation = useNavigation();

  const { color, outline, shadow, linkId }: ContextType = useOutletContext();

  const isSubmittingDelete =
    !(navigation.state === "idle") && navigation.formMethod === "DELETE";

  const [dropDown, setDropDown] = useState(0); //for showing dropdown
  return (
    <div className="flex self-center bg-black rounded-2xl w-64 h-[28rem] p-3">
      <div className="w-full h-full bg-gradient-to-b from-blue-300 to-blue-500 rounded-2xl p-3 flex flex-col gap-4 justify-start overflow-y-scroll hidden-scrollbar">
        {/* profile picture */}
        <div className="size-16 shrink-0 rounded-full bg-gray-700 self-center"></div>

        {/* email and username */}
        <div className="text-center">
          <h1 className="font-bold">{user.email}</h1>
          <p className="text-gray-500 text-sm">{user.username}</p>
        </div>

        {/* Links*/}
        <div className="flex flex-col gap-3">
          {data.map((dataLink, index) => {
            const flag = dataLink.id === selectedLink?.id;

            return (
              <div key={index}>
                <div
                  className={twMerge(
                    "flex justify-between items-center px-4 py-2 whitespace-nowrap",
                    dataLink.style?.class,
                    flag && `${color} ${outline} ${shadow}`,
                    flag && color === "bg-black" && "text-white"
                  )}
                >
                  {/* link text */}
                  {isSubmittingDelete && dataLink.id === linkId ? (
                    <p>Deleting...</p>
                  ) : (
                    <p
                      className={twMerge(
                        " w-full flex items-center justify-between gap-2",
                        flag && color === "bg-black" && "text-white"
                      )}
                      // className="w-full flex items-center justify-between gap-2"
                    >
                      {dataLink.title.substring(0, 16)}
                      {dataLink.title.length >= 20 && "..."}
                      {flag && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={twMerge(
                            " text-black text-lg",
                            flag && `${color}`,
                            flag && color === "bg-black" && "text-white"
                          )}
                        >
                          <FaUserEdit />
                        </motion.span>
                      )}
                    </p>
                  )}

                  {/* open dropdown button */}
                  <button
                    className={twMerge(
                      "cursor-pointer text-black",
                      flag && `${color}`,
                      flag && color === "bg-black" && "text-white"
                    )}
                    onClick={() => setDropDown(dataLink.id)}
                  >
                    <BsThreeDotsVertical />
                  </button>
                </div>
                {/* dropdown */}
                {!isSubmittingDelete && (
                  <DropDown
                    setDropDown={setDropDown}
                    dropDown={dropDown}
                    dataLink={dataLink}
                    setSelectedLinkId={setSelectedLinkId}
                    idPosition0={idPosition0}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Preview;
