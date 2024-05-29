/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FaPlus } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { RiLayoutTopLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { Form } from "@remix-run/react";
import { useState } from "react";

export default function BackOfficeMenu() {
  const [visible, setVisibility] = useState(false);

  return (
    <>
      {/* FORMULARIO PARA NUEVAS ENTRADAS */}

      <div className={`${visible ? "block" : "hidden"} w-screen`}>
        <div
          className="bg-black opacity-50 w-full h-full absolute left-0 top-0 z-40 overflow-hidden"
          onClick={() => setVisibility(!visible)}
        ></div>
        <div className="absolute top-10 w-full flex justify-center items-center">
          <Form
            method="post"
            className="bg-white rounded-3xl p-4 flex flex-col gap-4 w-[30%] z-50"
            onSubmit={() => setVisibility(!visible)}
          >
            <span className="message"></span>
            <input type="hidden" name="formType" value="add" />
            <div className="grid grid-cols-[20%_80%]">
              <label
                className="bg-gray-500 rounded-tl-xl rounded-bl-xl p-2"
                htmlFor="title"
              >
                Titulo
              </label>
              <input
                className="p-2 border-b border-gray-500"
                name="title"
                type="text"
                id="title"
              />
            </div>
            <div className="grid grid-cols-[20%_80%]">
              <label
                className="bg-gray-500 rounded-tl-xl rounded-bl-xl p-2"
                htmlFor="link"
              >
                link
              </label>
              <input
                className="p-2 border-b border-gray-500"
                name="link"
                type="text"
                id="link"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-700 text-white text-xl rounded-xl p-2 hover:bg-blue-600"
              >
                Add link
              </button>
            </div>
          </Form>
        </div>
      </div>

      {/* Boton add link */}
      <div className="w-full">
        <button
          onClick={() => setVisibility(!visible)}
          className="flex justify-center items-center bg-violet-600 hover:bg-violet-500 text-white rounded-full w-full p-3"
        >
          <FaPlus />
          <p>Add Link</p>
        </button>
        <div className="flex justify-between pt-3">
          <button className="flex gap-2 justify-center items-center p-3 bg-slate-300 hover:bg-slate-400 border rounded-full">
            <RiLayoutTopLine />
            <p>Add Header</p>
          </button>
          <button className="flex gap-2 justify-center items-center p-3 bg-slate-300 hover:bg-slate-400 border rounded-full">
            <FiArchive />
            View archive
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </>
  );
}
