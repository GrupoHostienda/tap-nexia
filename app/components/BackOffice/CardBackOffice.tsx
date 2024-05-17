import { TbMenu } from "react-icons/tb";
import { LuLayoutPanelLeft, LuTrash2 } from "react-icons/lu";
import { GiRapidshareArrow } from "react-icons/gi";
import { CiImageOn, CiStar, CiCalendar, CiLock } from "react-icons/ci";
import { ImStatsBars2 } from "react-icons/im";
import { BsBoxArrowUp } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegSave, FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { Form, useNavigation, useOutletContext } from "@remix-run/react";

export interface Card {
  title: string;
  url: string;
  active: boolean;
  id: number;
}
type OutletContextProps = {
  state: { items: [] };
  dispatch: React.Dispatch<React.SetStateAction<{}>>;
};

function CardBackOffice({ link }: { link: Card }) {
  const navigation = useNavigation();
  const isSubmittingDelete =
    !(navigation.state === "idle") && navigation.formMethod === "DELETE";
  const [idLink, setIdLink] = useState<number>();

  const [linkActivated, linkActive] = useState(false);
  const cardActive = () => {
    linkActive(!linkActivated);
    link.active = linkActivated;
  };

  const [inputEnabled, setInputEnabled] = useState(false);
  const toggleInput = (id: number) => {
    if (!inputEnabled) {
      setInputEnabled(!inputEnabled);
    } else {
      handleSaveEdit(id);
      setInputEnabled(!inputEnabled);
    }
  };

  const [editedItemUrl, setEditedItemUrl] = useState<string>("");
  const [editedItemText, setEditedItemText] = useState<string>("");

  const { state, dispatch } = useOutletContext<OutletContextProps>();

  // const handleEditItem = (item: Card) => {
  //   setEditedItemUrl(item.url);
  //   setEditedItemText(item.title);
  // };

  const handleSaveEdit = (id: number) => {
    dispatch({
      type: "updateItem",
      payload: {
        id: id,
        updatedData: {
          text: editedItemText,
          url: editedItemUrl,
        },
      },
    });
    // setEditedItemUrl("");
    // setEditedItemText("");
  };

  return (
    <>
      <div className="bg-gray-50 rounded-3xl w-full grid grid-cols-[5%_75%_15%] gap-2 p-3 shadow-md">
        <div className="border-r self-center">
          <TbMenu />
        </div>
        <Form
          method="POST"
          className="grid grid-rows-[min-content_min-content_min-content] gap-3 p-3"
        >
          <span className="text-wrap font-bold flex items-center gap-2">
            <input
              type="text"
              value={editedItemText}
              onChange={(e) => setEditedItemText(e.target.value)}
              className={`${inputEnabled? 'border-b':'border-none'} focus:border-none bg-transparent w-full`}
              placeholder={link.title}
              disabled={!inputEnabled}
            />
            {!inputEnabled ? (
              <span
                onClick={() => toggleInput(link.id)}
                className="opacity-70 hover:opacity-100 cursor-pointer"
              >
                {/* {!inputEnabled ? <MdOutlineEdit /> : <FaRegSave />} */}
                <MdOutlineEdit />
              </span>
            ) : (
              <button
                type="submit"
                onClick={() => toggleInput(link.id)}
                className="opacity-50 hover:opacity-100 cursor-pointer"
              >
                {/* {!inputEnabled ? <MdOutlineEdit /> : <FaRegSave />} */}
                <FaRegSave />
              </button>
            )}
          </span>
          <span className="flex font-bold items-center gap-2">
            <input
              type="text"
              value={editedItemUrl}
              onChange={(e) => setEditedItemUrl(e.target.value)}
              className={`${inputEnabled? 'border-b':'border-none'} focus:border-none bg-transparent w-full`}
              placeholder={link.url}
              disabled={!inputEnabled}
            />
            {!inputEnabled ? (
              <span
                onClick={() => toggleInput(link.id)}
                className="opacity-70 hover:opacity-100 cursor-pointer"
              >
                <MdOutlineEdit />
              </span>
            ) : (
              <button
                type="submit"
                onClick={() => toggleInput(link.id)}
                className="opacity-50 hover:opacity-100 cursor-pointer"
              >
                <FaRegSave />
              </button>
            )}
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
        </Form>
        <div className="border-l p-2 flex justify-end">
          <div className="flex flex-col gap-y-4 items-center self-center">
            {/* <div className="text-gray-700 font-bold flex justify-center size-max">
              <BsBoxArrowUp />
            </div> */}
            <div className="relative" onClick={cardActive}>
              <input type="checkbox" className="sr-only" value={0}/>
              <div
                className={`block ${
                  link.active ? `bg-green-400` : `bg-gray-600`
                } transition-colors w-14 h-8 rounded-full`}
              ></div>
              <div
                className={`dot absolute ${
                  link.active ? `right-2` : `left-1`
                } transition-all top-1 bg-white w-6 h-6 rounded-full`}
              ></div>
            </div>
            <Form
              method="delete"
              className="lg:col-start-2 text-xl flex justify-center lg:p-5 p-2 text-gray-700 hover:bg-gray-500 hover:text-white rounded-full transition-colors size-max "
            >
              <input type="hidden" name="link-id" value={link.id} />
              <button onClick={() => setIdLink(link.id)}>
                {isSubmittingDelete && idLink == link.id ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <LuTrash2 />
                )}
              </button>
            </Form>
          </div>
        </div>
      </div>
      {/* );
        })} */}
      {/* </div> */}
    </>
  );
}

export default CardBackOffice;
