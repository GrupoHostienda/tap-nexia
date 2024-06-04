/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FaPlus } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { RiLayoutTopLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { Form, useLoaderData, useOutletContext } from "@remix-run/react";
import { useState } from "react";
import { LinkStylesType, UserLinkType, ContextType } from "@/types";
import HeadingH2 from "../layout/HeadingH2";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import Buttons from "../stylesPage/Buttons";
import {
  COLORS,
  getRoundedClass,
  getShadowClass,
  getSpecialButtonClass,
} from "@/utils/stylesPage";
import { FaCircleCheck } from "react-icons/fa6";
import { motion } from "framer-motion";
import {
  SpecialButtonOne,
  SpecialButtonTwo,
} from "../stylesPage/SpecialButtons";

//type
type LoaderType = { userLinks: UserLinkType[]; links: LinkStylesType[] };

//component
export default function BackOfficeMenu() {
  const { links, userLinks }: LoaderType = useLoaderData();

  const [visible, setVisibility] = useState(false);

  const [selectedLinkId] = useState(userLinks[0]?.id); //1st link is default

  const selectedLink = userLinks.filter((link) => link?.id === selectedLinkId);

  const {
    color: colorState,
    outline: outlineState,
    shadow: shadowState,
    setColor,
    setOutline,
    setShadow,
  }: ContextType = useOutletContext();

  return (
    <>
      {/* FORMULARIO PARA NUEVAS ENTRADAS */}
      <div className={`${visible ? "block" : "hidden"} w-screen`}>
        {/* Backdrop */}
        <div
          className="bg-black opacity-50 w-full min-h-screen absolute top-0 bottom-0 left-0 right-0 z-40 overflow-hidden"
          onClick={() => setVisibility(!visible)}
        ></div>
        {/*  */}
        <div className="absolute top-10 z-50 left-1/2 -translate-x-1/2 w-[90%] max-w-[60rem] flex justify-center items-center">
          <Form
            method="post"
            className="bg-white rounded-3xl p-4 flex flex-col gap-4 max-w-[60rem] w-full z-50"
            onSubmit={() => setVisibility(!visible)}
          >
            {/* data a la action */}
            <input type="hidden" name="formType" value="add" />
            {/* title */}
            <div className="grid grid-cols-[10%_80%]">
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
            {/* link */}
            <div className="grid grid-cols-[10%_80%]">
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

            <input hidden name="color" defaultValue={colorState} />
            <input hidden name="rounded" defaultValue={outlineState} />
            <input hidden name="shadow" defaultValue={shadowState} />

            {/* ******************************************************* */}
            {/* Buttons */}
            <div>
              <HeadingH2 label=" Buttons">
                <BsFillMenuButtonWideFill />
              </HeadingH2>

              <div className=" bg-white p-6 rounded-xl flex flex-col gap-10 ">
                {/* colors */}
                <Buttons label="Fill">
                  {COLORS.map((color) => {
                    return (
                      <div
                        onClick={() => setColor(color)}
                        key={color}
                        className="relative cursor-pointer hover:scale-105 transition-all"
                      >
                        {((colorState && colorState === color) ||
                          (!colorState &&
                            selectedLink[0]?.style.class.includes(color))) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className=" absolute -top-2 -right-2 bg-white rounded-full text-green-600"
                          >
                            <FaCircleCheck />
                          </motion.div>
                        )}

                        <div
                          className={`border border-gray-400 h-10 ${color}`}
                        ></div>
                      </div>
                    );
                  })}
                </Buttons>

                {/* outline */}
                <Buttons label="Outline">
                  {/* se hace un copia del array que viene de la DB y se le aplica un reverse a la copia */}
                  {[...links[0].schemas[1].options]
                    .reverse()
                    .map((style, index) => {
                      const roundedClass = getRoundedClass(style) as string;
                      return (
                        <div
                          key={index}
                          onClick={() => setOutline(roundedClass!)}
                          className="relative cursor-pointer hover:scale-105 transition-all"
                        >
                          {((outlineState && outlineState === roundedClass) ||
                            (!outlineState &&
                              selectedLink[0]?.style.class.includes(
                                roundedClass
                              ))) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className=" absolute -top-2 -right-2 bg-white text-green-600"
                            >
                              <FaCircleCheck />
                            </motion.div>
                          )}
                          <div
                            className={` border border-gray-400 h-10 ${roundedClass}`}
                          />
                        </div>
                      );
                    })}
                </Buttons>

                {/* shadow */}
                <Buttons label="Shadow">
                  {links[0].schemas[2].options.map(
                    (style: string, index: number) => {
                      const shadowClass = getShadowClass(style) as string;

                      return (
                        <div
                          key={index}
                          onClick={() => setShadow(shadowClass!)}
                          className="relative cursor-pointer hover:scale-105 transition-all"
                        >
                          {((shadowState && shadowState === shadowClass) ||
                            (!shadowState &&
                              selectedLink[0]?.style.class.includes(
                                shadowClass
                              ))) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className=" absolute z-10 -top-2 -right-2 bg-white text-green-600"
                            >
                              <FaCircleCheck />
                            </motion.div>
                          )}
                          <div className=" relative z-0 h-10">
                            <div
                              className={` border border-gray-400 relative bg-white h-full ${shadowClass}`}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </Buttons>

                {/* special */}

                <Buttons label="Special" mustUpgrade={true}>
                  {links[0].schemas[3].options.map(
                    (style: string, index: number) => {
                      const specialButtonClass = getSpecialButtonClass(style);
                      return (
                        <div
                          key={index}
                          className={`h-10 ${specialButtonClass}`}
                        ></div>
                      );
                    }
                  )}
                  <div className="  h-10 bg-black rounded-full"></div>
                  <SpecialButtonOne />
                  <SpecialButtonTwo />
                </Buttons>
              </div>
            </div>
            {/* ******************************************************* */}

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
          onClick={() => {
            setVisibility(!visible);
            setColor("bg-white");
            setOutline("rounded-full");
            setShadow("shadow-lg");
          }}
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
