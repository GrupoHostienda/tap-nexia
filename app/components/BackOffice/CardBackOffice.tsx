import { TbMenu } from "react-icons/tb";
import { LuLayoutPanelLeft, LuTrash2 } from "react-icons/lu";
import { GiRapidshareArrow } from "react-icons/gi";
import { CiImageOn, CiStar, CiCalendar, CiLock } from "react-icons/ci";
import { ImStatsBars2 } from "react-icons/im";
import { BsBoxArrowUp } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import React, { useState } from "react";
import { useGlobalState, Item } from "../Context/GlobalContext";
// import { useGlobalState } from "../Context/GlobalContext";

type Card = {
  text: string;
  url: string;
  active: boolean;
  id: number;
};

const { state, dispatch } = useGlobalState();
const [newItemText, setNewItemText] = useState<string>("");
const [newItemUrl, setNewItemUrl] = useState<string>("");
const [itemID, setItemID] = useState<number>();


const handleEditItem = (item: Item) => {
  setNewItemUrl(item.url);
  setNewItemText(item.text);
  setItemID(item.id);
  toggleInput()
};

const handleSaveEdit = () => {
  dispatch({
    type: "UPDATE_ITEM",
    payload: {
      id: itemID!,
      updatedData: {
        text: newItemText,
        url: newItemUrl,
      },
    },
  });
  setNewItemText("");
  setNewItemUrl("");
  toggleInput()
};

const [inputEnabled, setInputEnabled] = useState<boolean>(false);

// Función para alternar entre habilitar y deshabilitar el input
const toggleInput = () => {
  setInputEnabled((prevState) => !prevState);
};

function CardBackOffice() {
  
  const [linkActivated, linkActive] = useState(false);
  const cardActive = () => {
    linkActive(!linkActivated);
  };

  return (
    <>
      <div className="flex flex-col gap-4 p-3 overflow-y-scroll h-screen hidden-scrollbar">
        {state.items.map((link) => {
          return (
            <div key={link.id}>
              
              <div className="bg-gray-50 rounded-3xl w-full grid grid-cols-[5%_70%_20%] gap-2 p-3 shadow-md">
                <div className="border-r self-center">
                  <TbMenu />
                </div>
                <div className="grid grid-rows-[min-content_min-content_min-content] gap-3 p-3">
                  <span className="text-wrap font-bold flex items-center gap-2">
                    <input
                      type="text"
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                      className="border-none focus:border-none bg-transparent"
                      placeholder={link.text}
                      disabled={inputEnabled}
                    />
                    <span
                      onClick={() => !inputEnabled ? handleEditItem(link): handleSaveEdit}
                      className="opacity-50 hover:opacity-100 cursor-pointer"
                    >
                      {!inputEnabled ? <MdOutlineEdit /> : <FaRegSave />}
                    </span>
                  </span>
                  <span className="flex font-bold items-center gap-2">
                    <input
                      type="text"
                      value={newItemUrl}
                      onChange={(e) => setNewItemUrl(e.target.value)}
                      className="border-none bg-transparent"
                      placeholder={link.url.substring(0, 19).concat("...")}
                      disabled={inputEnabled}
                    />
                    <span
                      onClick={() => !inputEnabled ? handleEditItem(link): handleSaveEdit}
                      className="opacity-50 hover:opacity-100 cursor-pointer"
                    >
                      {!inputEnabled ? <MdOutlineEdit /> : <FaRegSave />}
                    </span>
                  </span>
                  <div className="flex justify-start gap-3 p-3 text-gray-600">
                    <LuLayoutPanelLeft className="hover:cursor-pointer" />
                    <GiRapidshareArrow className="hover:cursor-pointer" />
                    <CiImageOn className="hover:cursor-pointer" />
                    <CiStar className="hover:cursor-pointer" />
                    <CiCalendar className="hover:cursor-pointer" />
                    <CiLock className="hover:cursor-pointer" />
                    <ImStatsBars2 className="hover:cursor-pointer" />
                  </div>
                </div>
                <div className="border-l p-2 flex justify-end">
                  <div className="grid lg:grid-cols-2 grid-cols-1 lg:grid-rows-[min-content_1fr] grid-rows-3 lg:gap-y-4 items-center cursor-pointer self-center">
                    <div className="text-gray-700 font-bold flex justify-center size-max">
                      <BsBoxArrowUp />
                    </div>
                    <div className="relative" onClick={cardActive}>
                      <input type="checkbox" className="sr-only" />
                      <div
                        className={`block ${
                          linkActivated ? `bg-green-400` : `bg-gray-600`
                        } transition-colors w-14 h-8 rounded-full`}
                      ></div>
                      <div
                        className={`dot absolute ${
                          linkActivated ? `right-2` : `left-1`
                        } transition-all top-1 bg-white w-6 h-6 rounded-full`}
                      ></div>
                    </div>
                    <div className="lg:col-start-2 text-xl flex justify-center lg:p-5 p-2 text-gray-700 hover:bg-gray-500 hover:text-white rounded-full transition-colors size-max">
                      <button
                        onClick={() =>
                          dispatch({ type: "REMOVE_ITEM", payload: link.id })
                        }
                      >
                        <LuTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CardBackOffice;
