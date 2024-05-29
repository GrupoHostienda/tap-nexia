/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { json } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useOutletContext,
} from "@remix-run/react";

import { sessionStorage } from "@/utils/session.server";

import { useEffect, useState } from "react";

import {
  COLORS,
  getRoundedClass,
  getSBackgroundClass,
  getShadowClass,
  getSpecialButtonClass,
} from "@/utils/stylesPage";

import { IoMdLock } from "react-icons/io";
import { HiPaintBrush } from "react-icons/hi2";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { PiSelectionBackground } from "react-icons/pi";
import { FaCircleCheck } from "react-icons/fa6";

import type {
  BackgroundType,
  ContextType,
  LinkStylesType,
  PreviewProps,
  UserLinkType,
  UserType,
} from "@/types";

import TwoColGridLayoutDratf from "@/components/layout/TwoColGridLayoutDratf";
import HeadingMobile from "@/components/layout/HeadingMobile";
import HeadingDesktop from "@/components/layout/HeadingDesktop";
import HeadingH2 from "@/components/layout/HeadingH2";
import Buttons from "@/components/stylesPage/Buttons";
import DashboarHeader from "@/components/DashboarHeader";
import Preview from "@/components/PreviewDraft";
import {
  SpecialButtonOne,
  SpecialButtonTwo,
} from "@/components/stylesPage/SpecialButtons";
import { motion } from "framer-motion";
import { applyNewStyle } from "@/utils/helpers";
import { getTokenIfConnected } from "@/services";
import {
  BackgroundsSchema,
  LinksStylesAPISchema,
  UserLinksSchema,
  UserSchema,
} from "@/schemas";

//meta
export function meta() {
  return [
    {
      title: "Hostienda | Styles",
    },
    {
      name: "description",
      content: "Styles page",
    },
  ];
}

//loader
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const authToken = await getTokenIfConnected(request); //redirecciona a /login si no estas autenticado

  const base = process.env.API_BASE;
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  const urls = {
    user: `${base}/user`,
    links: `${base}/links`,
    backgrounds: `${base}/backgrounds`,
    userLinks: `${base}/user/links`,
  };

  /* ******************************************* MEJORAR MANEJO DE ERRORES ********************************************/
  /* START | Fetch de datos */
  try {
    const responses = await Promise.all([
      fetch(urls.user, { headers }),
      fetch(urls.links, { headers }),
      fetch(urls.backgrounds, { headers }),
      fetch(urls.userLinks, { headers }),
    ]);

    if (
      !responses[0].ok ||
      !responses[1].ok ||
      !responses[2].ok ||
      !responses[3].ok
    ) {
      console.log("error at fetching data");
      throw new Error("Failed to fetch data"); //se mete por aca, pero no me renderiza este mensaje, renderiza otro
    }

    const [userData, linksData, backgroundsData, userLinksData] =
      await Promise.all([
        responses[0].json(),
        responses[1].json(),
        responses[2].json(),
        responses[3].json(),
      ]);

    const userDataVerified = UserSchema.safeParse(userData);
    const userLinksDataVerified = UserLinksSchema.safeParse(userLinksData);
    const linksDataVerified = LinksStylesAPISchema.safeParse(linksData);
    const backgroundsDataVerified =
      BackgroundsSchema.safeParse(backgroundsData);

    /* si NO pasa la validacion de zod retorno un error*/
    if (
      !userDataVerified.success ||
      !userLinksDataVerified.success ||
      !linksDataVerified.success ||
      !backgroundsDataVerified.success
    ) {
      console.log("error at validation");
      throw new Error("Failed to fetch data 😢 "); //se mete por aca, pero no me renderiza este mensaje, renderiza otro
    }

    return json({
      user: userDataVerified,
      links: linksDataVerified.data,
      backgrounds: backgroundsDataVerified.data,
      userLinks: userLinksDataVerified.data,
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

  const linkId = formData.get("link-id") as string;
  const color = formData.get("color") as string;
  const rounded = formData.get("rounded") as string;
  const shadow = formData.get("shadow") as string;

  //delete
  if (request.method === "DELETE") {
    const url = `${process.env.API_BASE}/user/link/delete/${linkId}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      await response.json();
      return json({ message: "Succeed to delete item" });
    } catch (error) {
      console.log(error);
      return json({ error: "Failed to delete item, try again later." });
    }
  }

  /* START | Fetch de datos */
  const urlLinks = `${process.env.API_BASE}/user/links `;

  const url = `${process.env.API_BASE}/user/link/update/${linkId} `;

  try {
    const responseLinks = await fetch(urlLinks, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    const links = await responseLinks.json();

    const link = links?.filter(
      (link: PreviewProps) => link.id === Number(linkId)
    );

    const newStyles = applyNewStyle(
      link[0].style.class,
      color,
      rounded,
      shadow
    );

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        link_type_id: 1,
        title: `${link[0]?.title}`,
        url: `${link[0]?.url}`,
        style: `${newStyles}`,
      }),
    });

    await response.json();

    return json({ message: "Succeed to save data" });
  } catch (error) {
    console.log(error);
    return json({ error: "Failed to save data, try again later." });
  }
  /* END | Fetch de datos */
};

//type
type LoaderDataType = {
  user: UserType;
  links: LinkStylesType;
  backgrounds: BackgroundType[];
  userLinks: UserLinkType[];
};

//component
export default function Styles() {
  const { user, links, backgrounds, userLinks }: LoaderDataType =
    useLoaderData();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const isSubmittingStyle =
    navigation.state === "submitting" && navigation.formMethod === "POST";

  const [selectedLinkId, setSelectedLinkId] = useState(userLinks[0]?.id); //1st link is default

  //message from action
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (actionData && "error" in actionData) {
      setMessage(actionData.error);
      const timer = setTimeout(() => {
        setMessage(""); // Limpia el mensaje de error después de 4 segundos
      }, 4000);

      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    } else if (actionData && "message" in actionData) {
      setMessage(actionData.message);
      const timer = setTimeout(() => {
        setMessage(""); // Limpia el mensaje de error después de 4 segundos
      }, 4000);

      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }
  }, [actionData]);

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
    <div className="pageLayout bg-slate-200">
      <DashboarHeader />
      <HeadingMobile label="Styles">
        <HiPaintBrush />
      </HeadingMobile>
      <TwoColGridLayoutDratf>
        {/* styles | col-01 */}
        <div className="colSpan-01 order-2 lg:order-1 //bg-gray-400">
          <div className="max-w-[60rem] w-[100%] mx-auto self-center py-8 px-6 flex flex-col gap-8 ">
            <HeadingDesktop label="Styles">
              <HiPaintBrush />
            </HeadingDesktop>

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

                            {/*  {style === "heavy" && (
                              <div
                                className={` h-full w-full bg-black absolute top-[0.30rem] left-[0.30rem] -z-10`}
                              />
                            )} */}
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

            {/* backgrounds */}
            <div>
              <HeadingH2 label="  Backgrounds">
                <PiSelectionBackground />
              </HeadingH2>
              <div className=" bg-white p-4 rounded-xl ">
                <div className=" grid grid-cols-1  sm:grid-cols-3 gap-4 ">
                  {backgrounds.map((style, index) => {
                    const bg = getSBackgroundClass(style.name);

                    return (
                      <div
                        key={index}
                        className=" flex flex-col items-center relative"
                      >
                        <div className=" absolute top-2 right-10 bg-white rounded-full text-green-600">
                          <FaCircleCheck />
                        </div>
                        <div
                          className={`h-[23rem] w-[14rem]  //xl:h-[30rem] //xl:w-[20rem] ${bg} rounded-md`}
                        ></div>
                        <p className=" pt-2 text-center">{style.name} Colour</p>
                      </div>
                    );
                  })}
                  <div className=" flex flex-col items-center">
                    <div className="relative">
                      <div
                        className=" h-[23rem] w-[14rem] //xl:h-[30rem] //xl:w-[20rem] border border-black rounded-md"
                        style={{
                          backgroundImage: 'url("/no-image.svg")',
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "30%",
                          opacity: "0.2",
                        }}
                      />
                      <p className=" absolute top-3 right-3 bg-black text-white px-2 rounded-md flex items-center gap-1">
                        <span>Upgrade</span>
                        <IoMdLock />
                      </p>
                    </div>
                    <p className=" pt-2 text-center">Image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* preview | col-02 */}
        <div className="colSpan-02 order-1 lg:order-2 //bg-red-500 ">
          <div className=" sticky top-20 flex flex-col gap-4 items-center bg-white lg:bg-transparent my-8 mx-6 lg:mx-0 rounded-xl lg:rounded-none py-4  lg:py-0 ">
            {/* for success | error message */}
            <div className=" lg:h-10">
              {/* mensaje de success */}
              {message && actionData && "message" in actionData && (
                <p className=" bg-green-500 w-64 text-center text-white px-4 py-2 rounded-full">
                  {message}
                </p>
              )}
              {/* mensaje de error */}
              {message && actionData && "error" in actionData && (
                <p className=" bg-red-500 text-center min-w-64 text-white px-4 py-2 rounded-full">
                  {message}
                </p>
              )}
            </div>

            <Preview
              data={userLinks}
              user={user}
              selectedLink={selectedLink[0]}
              setSelectedLinkId={setSelectedLinkId}
              idPosition0={userLinks[0]?.id}
            />
            {/* save button */}
            <Form method="post">
              <button
                disabled={isSubmittingStyle}
                className=" bg-gray-300 lg:bg-white w-64 rounded-full px-4 py-1 text-lg font-semibold hover:scale-105 transition-all"
              >
                <input
                  type="hidden"
                  name="link-id"
                  defaultValue={selectedLinkId}
                />
                <input hidden name="color" defaultValue={colorState} />
                <input hidden name="rounded" defaultValue={outlineState} />
                <input hidden name="shadow" defaultValue={shadowState} />
                {isSubmittingStyle ? "Saving..." : "Save"}
              </button>
            </Form>
          </div>
        </div>
      </TwoColGridLayoutDratf>
    </div>
  );
}
