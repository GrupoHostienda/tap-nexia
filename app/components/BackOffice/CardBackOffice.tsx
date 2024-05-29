import { TbMenu } from "react-icons/tb";
import { LuLayoutPanelLeft, LuTrash2 } from "react-icons/lu";
import { GiRapidshareArrow } from "react-icons/gi";
import { CiImageOn, CiStar, CiCalendar, CiLock } from "react-icons/ci";
import { ImStatsBars2 } from "react-icons/im";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegSave, FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { Form, useNavigation } from "@remix-run/react";

export interface Card {
  title: string;
  url: string;
  active: boolean;
  isHidden: number;
  id: number;
}

function CardBackOffice({ link }: { link: Card }) {
  const navigation = useNavigation();
  const isSubmittingDelete =
    !(navigation.state === "idle") && navigation.formMethod === "DELETE";
  const [idLink, setIdLink] = useState<number>();

  const [linkActivated, linkActive] = useState(link.isHidden === 0);
  const cardActive = () => {
    linkActive(!linkActivated);
    link.active = linkActivated;
  };

  const [inputEnabled, setInputEnabled] = useState(false);
  const toggleInput = (id: number) => {
    if (!inputEnabled) {
      setInputEnabled(!inputEnabled);
    } else {
      setInputEnabled(!inputEnabled);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevenir el envío por defecto del formulario

    const form1 = document.getElementById("data") as HTMLFormElement;
    const form2 = document.getElementById("visibilityBtn") as HTMLFormElement;
    const formData = new FormData();

    // Agregar datos de form1 a formData
    new FormData(form1).forEach((value, key) => {
      formData.append(key, value);
    });

    // Agregar datos de form2 a formData
    const isChecked = (
      form2.querySelector("input[name='isHidden']") as HTMLInputElement
    ).checked;
    formData.append("isHidden", isChecked ? "true" : "false");

    // Enviar los datos combinados con Fetch API
    fetch("./back-office", {
      method: "post",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Manejar la respuesta
      })
      .catch((error) => {
        console.error("Error:", error);
        // Manejar el error
      });
  };

  return (
    <>
      <div className="bg-gray-50 rounded-3xl w-full grid grid-cols-[5%_75%_15%] gap-2 p-3 shadow-md">
        <div className="border-r self-center">
          <TbMenu />
        </div>
        <Form
          method="POST"
          id="data"
          className="grid grid-rows-[min-content_min-content_min-content] gap-3 p-3"
        >
          <span className="text-wrap font-bold flex items-center gap-2">
            <input type="hidden" name="formType" value="update" />
            <input
              type="text"
              value={link.title}
              name="title"
              // onChange={(e) => setEditedItemText(e.target.value)}
              className={`${
                inputEnabled ? "border-b" : "border-none"
              } focus:border-none bg-transparent w-full`}
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
              // onChange={(e) => setEditedItemUrl(e.target.value)}
              className={`${
                inputEnabled ? "border-b" : "border-none"
              } focus:border-none bg-transparent w-full`}
              value={link.url}
              name="link"
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
            <div className="flex gap-4 items-center">
              <div className="text-gray-700 font-bold flex justify-center size-max">
                <FaRegSave
                  onClick={handleSubmit}
                  className="cursor-pointer"
                  title="save changes"
                />
              </div>
              <Form
                method="post"
                id="visibilityBtn"
                className="relative"
                onClick={cardActive}
              >
                <input type="hidden" name="formType" value="update" />
                <input
                  type="checkbox"
                  className="sr-only"
                  name="isHidden"
                  defaultChecked={link.active}
                />
                <div
                  className={`block ${
                    link.active ? `bg-green-400` : `bg-gray-600`
                  } transition-colors w-14 h-8 rounded-full`}
                ></div>
                <div
                  className={`dot absolute ${
                    link.active ? `right-1` : `left-1`
                  } transition-all top-1 bg-white w-6 h-6 rounded-full`}
                ></div>
              </Form>
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
