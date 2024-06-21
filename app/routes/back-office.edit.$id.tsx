/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { useEffect, useState } from "react";

import { getToken } from "@/services";

import { LinksStylesAPISchema, UserLinksSchema, UserSchema } from "@/schemas";

import { LinkStylesType, UserType, UserLinkType } from "@/types";

import HeadingH2 from "../components/layout/HeadingH2";
import Buttons from "../components/stylesPage/Buttons";
import {
  SpecialButtonOne,
  SpecialButtonTwo,
} from "../components/stylesPage/SpecialButtons";

import {
  COLORS,
  getRoundedClass,
  getShadowClass,
  getSpecialButtonClass,
} from "@/utils/stylesPage";

import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";

import { motion } from "framer-motion";
import { validateUrl } from "@/utils/helpers";

//meta
export function meta() {
  return [
    {
      title: "Back Office - Edit",
    },
    {
      name: "description",
      content: "Back Office - Edit",
    },
  ];
}

//loader
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const authToken = await getToken(request);

  if (!authToken) {
    return redirect("/login");
  }

  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  const base = process.env.API_BASE;
  const urls = {
    links: `${base}/links`,
    user: `${base}/user`,
    userLinks: `${base}/user/links`,
  };

  /* ******************************************* MEJORAR MANEJO DE ERRORES ********************************************/
  /* START | Fetch de datos */
  try {
    const responses = await Promise.all([
      fetch(urls.links, { headers }),
      fetch(urls.user, { headers }),
      fetch(urls.userLinks, { headers }),
    ]);

    if (!responses[0].ok || !responses[1].ok || !responses[2].ok) {
      console.log("error at fetching data");
      throw new Error("Failed to fetch data 😢 "); //se mete por aca, pero no me renderiza este mensaje, renderiza otros
    }

    const [linksData, userData, userLinksData] = await Promise.all([
      responses[0].json(),
      responses[1].json(),
      responses[2].json(),
    ]);

    const linksDataVerified = LinksStylesAPISchema.safeParse(linksData);
    const userDataVerified = UserSchema.safeParse(userData);
    const userLinksDataVerified = UserLinksSchema.safeParse(userLinksData);

    /* si NO pasa la validacion de zod retorno un error*/
    if (
      !userDataVerified.success ||
      !userLinksDataVerified.success ||
      !linksDataVerified.success
    ) {
      console.log("error at validation");
      throw new Error("Failed to fetch data 😢 "); //se mete por aca, pero no me renderiza este mensaje, renderiza otro
    }
    return json({
      links: linksDataVerified.data,
      userLinks: userLinksDataVerified.data,
      user: userDataVerified.data,
    });
  } catch (error) {
    console.log(error?.toString());
    return json({ error: `${error?.toString()} ********` });
  }
  /* END | Fetch de datos */
};

//action
export const action = async ({ params, request }: ActionFunctionArgs) => {
  const authToken = await getToken(request);

  if (!authToken) {
    return redirect("/login");
  }
  const { id } = params;

  const formData = await request.formData();

  const title = formData.get("title") as string;
  const link = formData.get("link") as string;

  const color = formData.get("color") as string;
  const rounded = formData.get("rounded") as string;
  const shadow = formData.get("shadow") as string;

  if (title.trim() === "" || link.trim() === "") {
    return json({ error: "All fields are required." });
  }

  if (!validateUrl(link)) {
    return json({ error: "Introduce a valid URL." });
  }

  /* ******************************************* MEJORAR MANEJO DE ERRORES ********************************************/
  try {
    const response = await fetch(
      `${process.env.API_BASE}/user/link/update/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          link_type_id: 1,
          title: title,
          url: link,
          style: `${color} ${rounded} ${shadow}`,
        }),
      }
    );

    if (!response.ok) {
      return json({ error: "Failed to save data " });
    }

    return redirect("/back-office");
  } catch (error) {
    return json({ error: error?.toString() });
  }
};

//type
type LoaderType = {
  userLinks: UserLinkType[];
  user: UserType;
  links: LinkStylesType[];
};
type ActionType = {
  error: string;
};

import {
  FaHome,
  FaLink,
  FaEnvelope,
  FaPhone,
  FaInfoCircle,
  FaBook,
  FaCalendar,
  FaCamera,
  FaShoppingCart,
  FaGlobe,
} from "react-icons/fa";

//component
const Add = () => {
  const { id } = useParams(); // id del link a editar

  const { userLinks, links }: LoaderType = useLoaderData();

  const action = useActionData<ActionType>();

  const editingLink = userLinks.filter((link) => link?.id === Number(id)); //link a editar
  const editingLinkStyle = editingLink[0].style.class.split(" ");

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const [colorState, setColor] = useState(editingLinkStyle[0]);
  const [outlineState, setOutline] = useState(editingLinkStyle[1]);
  const [shadowState, setShadow] = useState(editingLinkStyle[2]);

  const [titleInput, setTitleInput] = useState(editingLink[0]?.title);
  const [linkInput, setLinkInput] = useState(editingLink[0]?.url);

  const [linkType, setLinkType] = useState("1"); //para el select de linkTypes
  const [iconType, setIconType] = useState(""); //para el select de icons
  const [style, setStyle] = useState(""); //testing styles en iconButtons --> quitar luego

  const icons = [
    { id: "home", name: "Home" },
    { id: "link", name: "Links" },
    { id: "envelope", name: "Email" },
    { id: "phone", name: "Phone" },
    { id: "info-circle", name: "Info" },
    { id: "book", name: "Book" },
    { id: "calendar", name: "Calendar" },
    { id: "camera", name: "Camera" },
    { id: "shopping-cart", name: "Shop" },
    { id: "globe", name: "Website" },
  ];

  /* error message */
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (action) {
      setMessage(action.error);
      const timer = setTimeout(() => {
        setMessage(""); // Limpia el mensaje de error después de 4 segundos
      }, 4000);
      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }
  }, [action]);

  return (
    <>
      <Link
        to="/back-office"
        className=" fixed inset-0 bg-black/70 min-h-screen z-30"
      ></Link>
      <div className=" absolute z-40 top-10 w-[90%] max-w-[60rem] left-1/2 -translate-x-1/2 ">
        {/* form */}
        <Form
          method="post"
          className="bg-white rounded-3xl p-4 flex flex-col gap-4 max-w-[60rem] w-full z-50 mx-auto"
        >
          {/* title */}
          <div className="grid grid-cols-[20%_80%] sm:px-6">
            <label
              className=" bg-blue-700 text-white sm:text-xl rounded-tl-xl rounded-bl-xl flex items-center justify-center"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="p-2 outline-none border rounded-r-xl"
              placeholder="My favorite song..."
              name="title"
              type="text"
              id="title"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          </div>

          {/* link */}
          <div className="grid grid-cols-[20%_80%] sm:px-6">
            <label
              className=" bg-blue-700 text-white sm:text-xl rounded-tl-xl rounded-bl-xl flex items-center justify-center"
              htmlFor="link"
            >
              Link
            </label>
            <input
              className="p-2 outline-none border rounded-r-xl"
              placeholder="https://www.youtube.com/watch?..."
              name="link"
              type="text"
              id="link"
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
            />
          </div>

          {/* error message */}
          {message && (
            <p className=" hidden md:block bg-red-500 text-center min-w-64 text-white px-4 py-2 mx-6 rounded-full">
              {message}
            </p>
          )}

          {/* Buttons */}
          <div>
            <HeadingH2 label=" Buttons">
              <BsFillMenuButtonWideFill />
            </HeadingH2>

            {/* select type */}
            <select
              value={linkType}
              onChange={(e) => {
                setLinkType(e.target.value);
              }}
              className=" border p-2 rounded-md sm:mx-6 my-2 cursor-pointer"
            >
              {links.map((link) => {
                return (
                  <option key={link.id} value={link.id}>
                    {link.name}
                  </option>
                );
              })}
            </select>

            {/* Select para íconos */}
            {linkType === "2" && (
              <select
                value={iconType}
                onChange={(e) => setIconType(e.target.value)}
                className="border p-2 rounded-md sm:mx-6 my-2 cursor-pointer"
              >
                <option value="" disabled>
                  Select Icon
                </option>

                {icons.map((icon) => (
                  <option key={icon.id} value={icon.id}>
                    {icon.name}
                  </option>
                ))}
              </select>
            )}

            {/* Input para estilos */}
            {linkType === "2" && (
              <input
                type="text"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                placeholder="Enter styles (e.g., text-red-500)"
                className="border p-2 rounded-md sm:mx-6 my-2"
              />
            )}

            {/* Mostrar ícono seleccionado */}
            {linkType === "2" && (
              <div className={`mt-4 ${style}`}>
                {iconType === "home" && <FaHome />}
                {iconType === "link" && <FaLink />}
                {iconType === "envelope" && <FaEnvelope />}
                {iconType === "phone" && <FaPhone />}
                {iconType === "info-circle" && <FaInfoCircle />}
                {iconType === "book" && <FaBook />}
                {iconType === "calendar" && <FaCalendar />}
                {iconType === "camera" && <FaCamera />}
                {iconType === "shopping-cart" && <FaShoppingCart />}
                {iconType === "globe" && <FaGlobe />}
              </div>
            )}

            {linkType === "1" && (
              <div className=" pb-6 sm:px-6 flex flex-col gap-10 ">
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
                            editingLink[0]?.style.class.includes(color))) && (
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
                              editingLink[0]?.style.class.includes(
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
                              editingLink[0]?.style.class.includes(
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
            )}

            {linkType === "2" && (
              <div className="pb-6 sm:px-6 flex flex-col gap-10">
                {/* left | right */}
                <Buttons label=" Icon">
                  <div className=" border p-2 flex items-center justify-start gap-2 cursor-pointer hover:scale-105 transition-all //bg-slate-300">
                    <img
                      className=" w-10 h-10 object-cover rounded-full"
                      src="https://admin.tap.nexia.io/profile_covers/6655a3d5dd814_1716888533.jpeg"
                      alt="img"
                    />
                    <span>Text</span>
                  </div>
                  <div className=" border p-2 flex items-center justify-between gap-2 cursor-pointer hover:scale-105 transition-all //bg-slate-300">
                    <span>Text</span>
                    <img
                      className=" w-10 h-10 object-cover rounded-full"
                      src="https://admin.tap.nexia.io/profile_covers/6655a3d5dd814_1716888533.jpeg"
                      alt="img"
                    />
                  </div>
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
                              editingLink[0]?.style.class.includes(
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
                              editingLink[0]?.style.class.includes(
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
              </div>
            )}
          </div>

          {/* inputs that goes to the action */}
          <input hidden name="color" value={colorState} readOnly />
          <input hidden name="rounded" value={outlineState} readOnly />
          <input hidden name="shadow" value={shadowState} readOnly />

          {/* error message */}
          {message && (
            <p className=" md:hidden bg-red-500 text-center min-w-64 text-white px-4 py-2 rounded-full">
              {message}
            </p>
          )}

          {/* submmit | go back */}
          <div className=" flex items-center gap-4 justify-center sm:justify-start sm:px-6">
            {/* submit button */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-blue-700 text-white text-xl rounded-xl p-2 hover:scale-105 transition-all"
            >
              {!isSubmitting ? "Edit link" : "Editing link..."}
            </button>
            {/* go back button */}
            <Link
              to="/back-office"
              className="flex items-center gap-2 border border-gray-300 text-xl rounded-xl p-2 hover:scale-105 transition-all"
            >
              Go back
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Add;
