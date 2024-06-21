/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { json, redirect } from "@remix-run/node";

import { sessionStorage } from "@/utils/session.server";

import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigation,
  useOutletContext,
} from "@remix-run/react";

import { useEffect, useState } from "react";

import { getSBackgroundClass } from "@/utils/stylesPage";

import { getToken } from "@/services";

import { IoMdLock } from "react-icons/io";
import { HiPaintBrush } from "react-icons/hi2";
import { PiSelectionBackground } from "react-icons/pi";
import { FaCircleCheck } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { TiSocialTwitter } from "react-icons/ti";

import {
  BackgroundsSchema,
  LinksStylesAPISchema,
  UserLinksSchema,
  UserSchema,
} from "@/schemas";

import type {
  BackgroundType,
  ContextType,
  LinkStylesType,
  UserLinkType,
  UserType,
} from "@/types";

import { motion } from "framer-motion";

import TwoColGridLayoutDratf from "@/components/layout/TwoColGridLayoutDratf";
import HeadingMobile from "@/components/layout/HeadingMobile";
import HeadingDesktop from "@/components/layout/HeadingDesktop";
import HeadingH2 from "@/components/layout/HeadingH2";
import DashboarHeader from "@/components/DashboarHeader";
import Preview from "@/components/Preview";

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
  const authToken = await getToken(request);

  if (!authToken) {
    return redirect("/login");
  }

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

    console.log(userDataVerified);
    console.log(userLinksDataVerified);
    console.log(linksDataVerified);
    console.log(backgroundsDataVerified);

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
      user: userDataVerified.data,
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

  const linkId = formData.get("link-id") as string; //delete
  const backgroundId = formData.get("backgroundId") as string;
  const backgroundStyle = formData.get("backgroundStyle") as string;
  const bgId = Number(backgroundId);

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

      if (!response.ok) {
        console.log("error at delete data");
        throw new Error("Failed to delete data"); //se mete por aca, pero no me renderiza este mensaje, renderiza otro
      }

      await response.json();
      return json({ message: "Succeed to delete item" });
    } catch (error) {
      console.log(error);
      return json({ error: "Failed to delete item, try again later." });
    }
  }

  //edit bg
  const urlBackground = `${process.env.API_BASE}/user/home-page/store`;
  try {
    const responseBackground = await fetch(urlBackground, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        background_id: bgId,
        bio: "bio",
        style: `${backgroundStyle}`,
      }),
    });

    if (!responseBackground.ok) {
      console.log("error at edit background");
      throw new Error("Failed to edit data"); //se mete por aca, pero no me renderiza este mensaje, renderiza otro
    }
    await responseBackground.json();
    return json({ message: "Succeed to save data" });
  } catch (error) {
    console.log(error);
    return json({ error: "Failed to save data, try again later." });
  }
};

//type
type LoaderDataType = {
  user: UserType;
  links: LinkStylesType;
  backgrounds: BackgroundType[];
  userLinks: UserLinkType[];
};

//type
type FetcherData = {
  message?: string;
  error?: string;
};

//component
export default function Styles() {
  const { user, backgrounds, userLinks }: LoaderDataType = useLoaderData();

  const {
    background: backgroundState,
    setBackground,
    bgToDBId,
    setBgToDBId,
  }: ContextType = useOutletContext();

  const actionData = useActionData<typeof action>();

  const navigation = useNavigation();

  const isSubmittingStyle =
    navigation.state === "submitting" && navigation.formMethod === "POST";

  const bgDB = user?.home_page?.background.name; //bg-preview

  const fetcher = useFetcher<FetcherData>();

  const isSubmittingFetcher = fetcher.state !== "idle"; //for adding links

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

  //message from addLinkAction
  const [addLinkMessage, setAddLinkMessage] = useState("");
  useEffect(() => {
    if (fetcher.data && fetcher.data.message) {
      setAddLinkMessage(fetcher.data.message);
      const timer = setTimeout(() => {
        setAddLinkMessage(""); // Limpia el mensaje de error después de 4 segundos
      }, 4000);

      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    } else if (fetcher.data && fetcher.data.error) {
      setAddLinkMessage(fetcher.data.error);
      const timer = setTimeout(() => {
        setAddLinkMessage(""); // Limpia el mensaje de error después de 4 segundos
      }, 4000);

      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }
  }, [fetcher.data]);

  const selectOptions = [
    { type: "Facebook", value: "Facebook" },
    { type: "Twitter", value: "Twitter" },
    { type: "Instagram", value: "Instagram" },
    { type: "Linkedin", value: "Linkedin" },
    { type: "Youtube", value: "Youtube" },
  ];
  const initialSocialLinksDB = selectOptions.map((option) => {
    const existingLink = user?.social_media?.find(
      (link) => link.type === option.type
    );
    return existingLink ? existingLink : { type: option.type, url: "" };
  });
  const [socialLinksState, setSocialLinksState] =
    useState(initialSocialLinksDB);
  const [selectedSocial, setSelectedSocial] = useState(
    initialSocialLinksDB[0].type
  ); // select add-link
  const [socialInput, setSocialInput] = useState(initialSocialLinksDB[0].url); //controlled add-link input
  useEffect(() => {
    const selectedLink = socialLinksState.find(
      (link) => link.type === selectedSocial
    );
    if (selectedLink) {
      setSocialInput(selectedLink.url);
    } else {
      setSocialInput("");
    }
  }, [selectedSocial, socialLinksState]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSocialInput(newValue);

    const updatedLinksState = socialLinksState?.map((link) =>
      link.type === selectedSocial ? { ...link, url: newValue } : link
    );
    setSocialLinksState(updatedLinksState);
  };
  console.log(socialLinksState);
  console.log(socialInput);
  return (
    <div className="pageLayout bg-slate-200">
      <DashboarHeader />
      <HeadingMobile label="Styles">
        <HiPaintBrush />
      </HeadingMobile>
      <TwoColGridLayoutDratf>
        {/* styles | col-01 */}
        <div className="colSpan-01 order-2 lg:order-1 //bg-gray-400 ">
          <div className="max-w-[60rem] w-[100%] mx-auto self-center py-8 px-6 flex flex-col gap-8 ">
            <HeadingDesktop label="Styles">
              <HiPaintBrush />
            </HeadingDesktop>

            {/* Social Media */}
            <div>
              <HeadingH2 label="  Social Media">
                <IoShareSocial />
              </HeadingH2>
              <div className=" bg-white p-4 rounded-xl flex flex-col gap-4 w-full">
                <h2>Agregar Enlace a redes sociales</h2>

                <fetcher.Form
                  method="POST"
                  action="/add-link"
                  className="flex sm:items-center flex-col sm:flex-row gap-4"
                >
                  {/* select */}
                  <div className="w-full sm:max-w-36">
                    <select
                      name="social-type"
                      className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full custom-select cursor-pointer"
                      value={selectedSocial}
                      onChange={(e) => setSelectedSocial(e.target.value)}
                    >
                      {selectOptions.map((opc) => (
                        <option key={opc.type} value={opc.value}>
                          {opc.type}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/*                   <FaCircleCheck className=" h-4 w-4 //absolute top-0 z-50 bg-white text-green-500 rounded-full " />*/}{" "}
                  {/* input */}
                  <div className="w-full flex-1">
                    <input
                      className="w-full h-full focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-200 rounded-md p-2"
                      type="text"
                      name="social-link"
                      placeholder={`https://www.${selectedSocial}.com/username...`}
                      value={socialInput}
                      onChange={handleInputChange}
                    />

                    {socialLinksState?.map((link) => (
                      <input
                        key={link.type}
                        hidden
                        name={`social-links-${link.type}`}
                        value={JSON.stringify({
                          type: link.type,
                          url: link.url,
                        })}
                        readOnly
                      />
                    ))}
                  </div>
                  <button
                    disabled={isSubmittingFetcher}
                    className="bg-blue-700 text-white text-nowrap rounded-md hover:bg-blue-500 p-2 "
                  >
                    {!isSubmittingFetcher ? " Add Social" : "Adding..."}
                  </button>
                </fetcher.Form>

                {/* fetcher messages*/}
                <div>
                  {fetcher.data && fetcher.data.error && addLinkMessage && (
                    <p className=" //bg-red-500 //w-64 //text-center text-red-500 //px-4 //py-2 //rounded-full">
                      {addLinkMessage}
                    </p>
                  )}
                  {fetcher.data && fetcher.data.message && addLinkMessage && (
                    <p className=" //bg-green-500 //w-64 //text-center text-green-500 //px-4 //py-2 //rounded-full">
                      {addLinkMessage}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                  <div className=" h-full flex items-center justify-center text-4xl">
                    <TiSocialTwitter />
                  </div>
                  <div className="">
                    {/* Espacio para los links y el boton de edicion */}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Libero, praesentium placeat. Sunt esse explicabo optio illum
                    itaque rerum, velit, repudiandae ipsam, accusamus corrupti
                    id sapiente. Praesentium dicta aliquam impedit labore!
                  </div>
                </div>
              </div>
            </div>
            {/* backgrounds */}
            <div>
              <HeadingH2 label="  Backgrounds">
                <PiSelectionBackground />
              </HeadingH2>
              <div className=" bg-white p-4 rounded-xl">
                <div className=" grid grid-cols-1  sm:grid-cols-3 gap-4 ">
                  {backgrounds.map((style, index) => {
                    const bg = getSBackgroundClass(style.name) as string;
                    if (!backgroundState && bgDB === style.name) {
                      setBackground(bg);
                      setBgToDBId(style.id);
                    }

                    return (
                      <div key={index} className=" flex flex-col items-center">
                        <div
                          onClick={() => {
                            setBackground(bg);
                            setBgToDBId(style.id);
                          }}
                          className={`h-[23rem] w-[14rem]  //xl:h-[30rem] //xl:w-[20rem] ${bg} rounded-md cursor-pointer hover:scale-105 transition-all relative`}
                        >
                          {((backgroundState && backgroundState === bg) ||
                            (!backgroundState && bgDB === style.name) ||
                            (!user.home_page &&
                              style.id === 1 &&
                              !backgroundState)) && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className=" absolute z-10 top-1 right-1 bg-white rounded-full text-green-600"
                            >
                              <FaCircleCheck />
                            </motion.div>
                          )}
                        </div>
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

            <Preview data={userLinks} user={user} />

            {/* save button */}
            <Form method="post">
              <input
                hidden
                name="backgroundId"
                value={bgToDBId ? bgToDBId : ""}
                readOnly
              />
              <input
                hidden
                name="backgroundStyle"
                value={backgroundState}
                readOnly
              />
              <button
                disabled={isSubmittingStyle}
                className=" bg-gray-300 lg:bg-white w-64 rounded-full px-4 py-1 text-lg font-semibold hover:scale-105 transition-all"
              >
                {isSubmittingStyle ? "Saving..." : "Save"}
              </button>
            </Form>
          </div>
        </div>
      </TwoColGridLayoutDratf>
    </div>
  );
}
