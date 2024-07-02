/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { TbMenu } from "react-icons/tb";
import { LuLayoutPanelLeft, LuTrash2 } from "react-icons/lu";
import { GiRapidshareArrow } from "react-icons/gi";
import { CiImageOn, CiStar, CiCalendar, CiLock } from "react-icons/ci";
import { ImStatsBars2 } from "react-icons/im";
import { MdOutlineEdit, MdEditOff } from "react-icons/md";
import { FaRegSave, FaSpinner } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Form, useNavigation, useSubmit } from "@remix-run/react";
import { UserLinkType } from "@/types";

//component
function CardBackOffice({ link }: { link: UserLinkType }) {
  const navigation = useNavigation();

  const ref = useRef<HTMLInputElement>(null); //para el checkbox

  const isSubmittingDelete =
    !(navigation.state === "idle") && navigation.formMethod === "DELETE";
  const isSubmitting =
    !(navigation.state === "idle") && navigation.formMethod === "POST";
  const [idLink, setIdLink] = useState<number>();

  const [linkActivated, setLinkActivated] = useState(link.isHidden == 0);

  //para el checkbox
  const submit = useSubmit();
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    submit(event.currentTarget.form);
  };

  const [inputEnabled, setInputEnabled] = useState(false);
  const toggleInput = () => {
    if (!inputEnabled) {
      setInputEnabled(true);
    } else {
      setInputEnabled(!inputEnabled);
    }
  };

  const [inputs, setValues] = useState({
    title: link.title,
    url: link.url,
  });

  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...inputs,
      [name]: value,
    });
  };

  //ref button type button and input type checkbox
  const handleCheckboxRef = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  useEffect(() => {
    // Este efecto se ejecutará cuando las propiedades del enlace cambien
    setValues({
      title: link.title,
      url: link.url,
    });
    setInputEnabled(false); // Deshabilita los inputs después de la actualización
  }, [link]);

  return (
    <>
      <div className="bg-gray-50 rounded-3xl w-full grid sm:grid-cols-12 sm:justify-center gap-2 sm:gap-0 p-4 sm:p-0 shadow-md">
        <div className="hidden sm:block self-center mx-auto">
          <TbMenu />
        </div>
        <Form className=" sm:col-span-9 grid grid-rows-[min-content_min-content_min-content] gap-3 p-3 sm:p-0 sm:py-3">
          <span className="text-wrap font-bold flex items-center gap-2">
            <input
              type="text"
              value={inputs.title || link.title}
              name="title"
              onChange={handleInputs}
              className={` ${
                inputEnabled && "border bg-white"
              } w-full bg-transparent outline-none p-2 rounded-md`}
              disabled={!inputEnabled}
            />
          </span>
          <span className="flex font-bold items-center gap-2">
            <input
              type="text"
              onChange={handleInputs}
              className={` ${
                inputEnabled && "border"
              } w-full //bg-transparent outline-none p-2 rounded-md`}
              name="url"
              value={inputs.url || link.url}
              disabled={!inputEnabled}
            />
          </span>
          <div className="flex flex-wrap justify-start items-center gap-3 py-2 text-gray-600">
            <LuLayoutPanelLeft className="hover:cursor-pointer" />
            <GiRapidshareArrow className="hover:cursor-pointer" />
            <CiImageOn className="hover:cursor-pointer" />
            <CiStar className="hover:cursor-pointer" />
            <CiCalendar className="hover:cursor-pointer" />
            <CiLock className="hover:cursor-pointer" />
            <ImStatsBars2 className="hover:cursor-pointer" />
          </div>

          {/* INPUT PARA ENVIAR EL ID DE LA CARD */}
          <input type="hidden" value={link.id} name="idCard" />
        </Form>
        <div className=" sm:col-span-2 flex sm:flex-col gap-4 items-center sm:justify-center p-3 sm:p-0 sm:py-3">
          {/* **************************** */}
          <Form
            method="post"
            //action="/asa"
            id={"visibilityBtn" + link.id}
            className="order-2 sm:order-1 cursor-pointer"
          >
            {/* checkbox - hidden */}
            <input
              type="checkbox"
              // className="hidden"
              //  ref={ref}
              checked={link.isHidden === 0}
              name="isHidden"
              onChange={handleChange}
            />
            <input type="hidden" name="title" value={inputs.title} />
            <input type="hidden" name="url" value={inputs.url} />
            <input type="hidden" name="style" value={link.style.class} />
            <input type="hidden" value={link.id} name="idCard" />

            {/* submmit button */}
            <button
              className="relative"
              onClick={() => setLinkActivated((prev) => !prev)}
            >
              <div
                onClick={handleCheckboxRef}
                className={`block ${
                  linkActivated
                    ? `bg-green-400 transition-all`
                    : `bg-gray-600 transition-all`
                } w-14 h-8 rounded-full`}
              ></div>
              <div
                onClick={handleCheckboxRef}
                className={`//dot absolute ${
                  linkActivated
                    ? `right-1 transition-all`
                    : `left-1 transition-all`
                } top-1 bg-white w-6 h-6 rounded-full`}
              ></div>
            </button>
          </Form>
          {/* **************************** */}

          <div className="order-1 sm:order-2 flex items-center gap-2 ">
            <Form method="POST">
              <input type="hidden" name="title" value={inputs.title} />
              <input type="hidden" name="url" value={inputs.url} />
              <input type="hidden" value={link.id} name="idCard" />

              <button
                type="submit"
                onClick={() => setIdLink(link.id)}
                className={`text-gray-700 font-bold flex justify-center size-max hover:scale-110 transition-all ${
                  inputEnabled ? "opacity-100" : "opacity-50"
                }`}
                disabled={!inputEnabled}
              >
                {isSubmitting && idLink == link.id ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaRegSave className="cursor-pointer" title="save changes" />
                )}
              </button>
            </Form>

            {!inputEnabled ? (
              <span
                onClick={() => toggleInput()}
                className="opacity-70 hover:opacity-100 cursor-pointer hover:scale-110 transition-all"
              >
                <MdOutlineEdit title="Editar campos" />
              </span>
            ) : (
              <span
                onClick={() => toggleInput()}
                className="opacity-50 hover:opacity-100 cursor-pointer hover:scale-110 transition-all"
              >
                <MdEditOff title="Dejar de editar" />
              </span>
            )}

            <Form method="delete">
              <input type="hidden" name="link-id" value={link.id} />
              <button
                className="hover:scale-110 transition-all"
                onClick={() => setIdLink(link.id)}
              >
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
    </>
  );
}

export default CardBackOffice;
