import { Link, useNavigation, useOutletContext } from "@remix-run/react";

import { useState } from "react";

import DropDown from "./DropDown";

import { BsThreeDotsVertical } from "react-icons/bs";

import type { ContextType, UserLinkType, UserType } from "@/types";

import { twMerge } from "tailwind-merge";

//type
type PreviewProps = {
  data: UserLinkType[];
  user: UserType;
};

//component
function Preview({ data, user }: PreviewProps) {
  const navigation = useNavigation();

  const { linkId, background }: ContextType = useOutletContext();

  const isSubmittingDelete =
    !(navigation.state === "idle") && navigation.formMethod === "DELETE";

  const [dropDown, setDropDown] = useState(0); //for showing dropdown

  const bgDB = user?.home_page?.style; //bg-preview /* oooooooooooooooooooo */

  return (
    <div className="flex self-center bg-black rounded-2xl w-64 h-[28rem] p-3">
      <div
        className={twMerge(
          `w-full h-full bg-gray-600 rounded-2xl p-3 flex flex-col gap-4 justify-start overflow-y-scroll hidden-scrollbar`,
          bgDB,
          background
        )}
      >
        {/* profile picture */}
        <div className="shrink-0 rounded-full bg-gray-700 self-center overflow-hidden ">
          <img
            className="object-cover bg-center rounded-full size-16 "
            src={user.cover ? `${user.cover}` : "/avatar-user.png"}
            alt="user"
          />
        </div>

        {/* email and username */}
        <div className="text-center">
          <h1 className="font-bold text-gray-300">{user.email}</h1>
          <p className="text-sm text-gray-300">{user.username}</p>
        </div>

        {/* Links*/}
        <div className="flex flex-col gap-3">
          {data ? (
            [...data].reverse().map((dataLink, index) => {
              return (
                <div key={index}>
                  <div
                    className={twMerge(
                      "flex justify-between items-center px-4 py-2 whitespace-nowrap",
                      dataLink.style?.class
                    )}
                  >
                    {/* link text */}
                    {isSubmittingDelete && dataLink.id === linkId ? (
                      <p>Deleting...</p>
                    ) : (
                      <p
                        className={twMerge(
                          " w-full flex items-center justify-between gap-2"
                        )}
                      >
                        {dataLink.title.substring(0, 16)}
                        {dataLink.title.length >= 20 && "..."}
                      </p>
                    )}

                    {/* open dropdown button */}
                    <button
                      className={twMerge("cursor-pointer text-black")}
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
                    />
                  )}
                </div>
              );
            })
          ) : (
            <Link
              to="/back-office"
              className=" bg-white rounded-full p-2 cursor-pointer hover:scale-105 transition-all"
            >
              Add a link
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Preview;
