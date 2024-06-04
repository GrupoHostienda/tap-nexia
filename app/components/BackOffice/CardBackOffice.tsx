import { TbMenu } from "react-icons/tb";
import { LuLayoutPanelLeft, LuTrash2 } from "react-icons/lu";
import { GiRapidshareArrow } from "react-icons/gi";
import { CiImageOn, CiStar, CiCalendar, CiLock } from "react-icons/ci";
import { ImStatsBars2 } from "react-icons/im";
import { MdOutlineEdit, MdEditOff } from "react-icons/md";
import { FaRegSave, FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { Form, redirect, useNavigation } from "@remix-run/react";
import { UserLinkType } from "@/types";

function CardBackOffice({ link }: { link: UserLinkType }) {
  const navigation = useNavigation();
  const isSubmittingDelete =
    !(navigation.state === "idle") && navigation.formMethod === "DELETE";
  const isSubmitting =
    !(navigation.state === "idle") && navigation.formMethod === "POST";
  const [idLink, setIdLink] = useState<number>();

  const [linkActivated, linkActive] = useState(link.isHidden == 0);
  // console.log(linkActivated)
  const cardActive = () => {
    linkActive(!linkActivated);
  };

  const [inputEnabled, setInputEnabled] = useState(false);
  const toggleInput = (id: number) => {
    if (!inputEnabled) {
      setInputEnabled(true);
      // setValues({
      //   title: "",
      //   url: ""
      // });
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

  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault(); // Prevenir el envío por defecto del formulario
  //   setIdLink(link.id);
  //   const form1 = document.getElementById("data" + link.id) as HTMLFormElement;
  //   const form2 = document.getElementById(
  //     "visibilityBtn" + link.id
  //   ) as HTMLFormElement;
  //   const formData = new FormData();

  //   // Agregar datos de form1 a formData
  //   new FormData(form1).forEach((value, key) => {
  //     if (value != (null || "")) {
  //       formData.append(key, value);
  //       console.log(key + " " + value);
  //     } else {
  //       if (key == "title") {
  //         value = link.title;
  //         formData.append(key, value);
  //         console.log(key + " " + value);
  //       } else if (key == "url") {
  //         value = link.url;
  //         formData.append(key, value);
  //         console.log(key + " " + value);
  //       }
  //     }
  //   });

  //   // Agregar datos de form2 a formData
  //   const isChecked = (
  //     form2.querySelector("input[name='isHidden']") as HTMLInputElement
  //   ).checked;
  //   formData.append("isHidden", isChecked ? "0" : "1");
  //   console.log(isChecked);
  //   // Enviar los datos combinados con Fetch API
  //   fetch("./back-office-draft-ron", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //       // Manejar la respuesta
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       // Manejar el error
  //     });
  //   redirect("./preview");
  // };

  return (
    <>
      <div className="bg-gray-50 rounded-3xl w-full grid grid-cols-[5%_75%_15%] gap-2 p-3 shadow-md">
        <div className="border-r self-center">
          <TbMenu />
        </div>
        <Form
          // method="POST"
          // id={"data" + link.id}
          className="grid grid-rows-[min-content_min-content_min-content] gap-3 p-3"
        >
          <span className="text-wrap font-bold flex items-center gap-2">
            <input type="hidden" name="formType" value="update" />
            <input
              type="text"
              value={inputs.title||link.title}
              name="title"
              onChange={handleInputs}
              className={`border-b w-full outline-none bg-gray-300 p-2 rounded-md`}
              disabled={!inputEnabled}
            />

            {!inputEnabled ? (
              <span
                onClick={() => toggleInput(link.id)}
                className="opacity-70 hover:opacity-100 cursor-pointer"
              >
                <MdOutlineEdit title="Editar campos" />
              </span>
            ) : (
              <span
                onClick={() => toggleInput(link.id)}
                className="opacity-50 hover:opacity-100 cursor-pointer"
              >
                <MdEditOff title="Dejar de editar" />
              </span>
            )}
          </span>
          <span className="flex font-bold items-center gap-2">
            <input
              type="text"
              onChange={handleInputs}
              className={`border-b w-full outline-none bg-gray-300 p-2 rounded-md`}
              name="url"
              value={inputs.url||link.url}
              disabled={!inputEnabled}
            />
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

          {/* INPUT PARA ENVIAR EL ID DE LA CARD */}
          <input type="hidden" value={link.id} name="idCard" />
        </Form>
        <div className="border-l p-2 flex justify-end">
          <div className="flex flex-col gap-y-4 items-center self-center">
            <div className="flex gap-4 items-center">
              <Form method="POST">
                <input type="hidden" name="formType" value="update" />
                <input type="hidden" name="title" value={inputs.title} />
                <input type="hidden" name="url" value={inputs.url} />
                <input type="hidden" value={link.id} name="idCard" />

                <button
                  type="submit"
                  onClick={() => setIdLink(link.id)}
                  className={`text-gray-700 font-bold flex justify-center size-max ${
                    inputEnabled ? "opacity-100" : "opacity-50"
                  }`}
                  disabled={!inputEnabled}
                >
                  {isSubmitting && idLink == link.id ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaRegSave
                      onClick={()=> setValues({
                          title: "",
                          url: ""
                        })}
                      className="cursor-pointer"
                      title="save changes"
                    />
                  )}
                </button>
              </Form>

              <Form
                method="post"
                id={"visibilityBtn" + link.id}
                className="relative"
                onClick={cardActive}
              >
                <input type="hidden" name="formType" value="update" />
                <input
                  type="checkbox"
                  className="sr-only"
                  name="isHidden"
                  defaultChecked={linkActivated}
                />
                <div
                  className={`block ${
                    linkActivated ? `bg-green-400` : `bg-gray-600`
                  } transition-colors w-14 h-8 rounded-full`}
                ></div>
                <div
                  className={`dot absolute ${
                    linkActivated ? `right-1` : `left-1`
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
