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
  useOutletContext,
} from "@remix-run/react";
import { useEffect, useState } from "react";

import { getToken } from "@/services";

import { sessionStorage } from "@/utils/session.server";

import { LinksStylesAPISchema, UserLinksSchema, UserSchema } from "@/schemas";

import { LinkStylesType, UserType, UserLinkType, ContextType } from "@/types";

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
      title: "Back Office - Add",
    },
    {
      name: "description",
      content: "Back Office - Add",
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
      userDataVerified.success ||
      !userLinksDataVerified.success ||
      !linksDataVerified.success
    ) {
      console.log("error at validation");
      throw new Error("Failed to fetch data 😢 "); //se mete por aca, pero no me renderiza este mensaje, renderiza otro
    }

    return json({
      links: linksDataVerified.data,
      userLinks: userLinksDataVerified.data,
      user: userData,
    });
  } catch (error) {
    console.log(error?.toString());
    return json({ error: `${error?.toString()} ********` });
  }
  /* END | Fetch de datos */
};

//action
export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const authToken = session.get("authToken");

  const formData = await request.formData();
  const title = formData.get("title") as string;
  const link = formData.get("link") as string;
  const color = (formData.get("color") as string) || "bg-white";
  const rounded = (formData.get("rounded") as string) || "rounded-full";
  const shadow = (formData.get("shadow") as string) || "shadow-md";

  console.log(color);
  console.log(rounded);
  console.log(shadow);

  if (title.trim() === "" || link.trim() === "") {
    return json({ error: "All fields are required." });
  }

  if (!validateUrl(link)) {
    return json({ error: "Is not a valid URL." });
  }

  /* ******************************************* MEJORAR MANEJO DE ERRORES ********************************************/
  try {
    const response = await fetch(`${process.env.API_BASE}/user/link/store`, {
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
    });

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

//component
const Add = () => {
  const { userLinks, links }: LoaderType = useLoaderData();

  const action = useActionData<ActionType>();

  const [selectedLinkId] = useState(userLinks[0]?.id); //1st link is default

  const selectedLink = userLinks.filter((link) => link?.id === selectedLinkId);

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const isRouting = navigation.location !== undefined;

  const submitMethod = navigation.formMethod; //cuando el submit viene del onclick en los links esta const es undefined, si viene del crud de /styles será POST

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

  /*   const {
    color: colorState,
    outline: outlineState,
    shadow: shadowState,
    setColor,
    setOutline,
    setShadow,
  }: ContextType = useOutletContext(); */

  const [colorState, setColor] = useState("");
  const [outlineState, setOutline] = useState("");
  const [shadowState, setShadow] = useState("");

  console.log(colorState);
  console.log(outlineState);
  console.log(shadowState);

  return (
    <>
      <div className=" fixed inset-0 bg-black/70 min-h-screen z-30"></div>
      <div className=" absolute z-40 top-10 w-[90%] left-1/2 -translate-x-1/2 ">
        {/* form */}
        <Form
          method="post"
          className="bg-white rounded-3xl p-4 flex flex-col gap-4 max-w-[60rem] w-full z-50 mx-auto"
        >
          {/* title */}
          <div className="grid grid-cols-[20%_80%] sm:px-6">
            <label
              className="bg-gray-600 text-white text-center rounded-tl-xl rounded-bl-xl p-2"
              htmlFor="title"
            >
              Titulo
            </label>
            <input
              className="p-2 outline-none bg-gray-300 rounded-r-xl"
              placeholder="My favorite song..."
              name="title"
              type="text"
              id="title"
            />
          </div>

          {/* link */}
          <div className="grid grid-cols-[20%_80%] sm:px-6">
            <label
              className="bg-gray-600 text-white text-center rounded-tl-xl rounded-bl-xl p-2"
              htmlFor="link"
            >
              Link
            </label>
            <input
              className="p-2 outline-none bg-gray-300 rounded-r-xl"
              placeholder="https://www.youtube.com/watch?..."
              name="link"
              type="text"
              id="link"
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

            <div className=" bg-white pb-6 sm:px-6 rounded-xl flex flex-col gap-10 ">
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

          {/* inputs that goes to the action */}
          <input hidden name="color" defaultValue={colorState} />
          <input hidden name="rounded" defaultValue={outlineState} />
          <input hidden name="shadow" defaultValue={shadowState} />

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
              {!isSubmitting ? "Add link" : "Adding link..."}
            </button>
            {/* go back button */}
            <Link
              to="/back-office"
              className="flex items-center gap-2 border border-gray-300 text-xl rounded-xl p-2 hover:scale-105 transition-all"
            >
              Go back
              {isRouting && !submitMethod && (
                <div className=" mx-auto animate-spin h-5 w-5 border-l-2 border-gray-600 rounded-full "></div>
              )}
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Add;
