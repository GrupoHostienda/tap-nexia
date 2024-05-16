import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";

import { sessionStorage } from "@/utils/session.server";

import DashboarHeader from "@/components/DashboarHeader";
import Preview from "@/components/Preview";
import {
  SpecialButtonOne,
  SpecialButtonTwo,
} from "@/components/stylesPage/SpecialButtons";
import {
  getRoundedClass,
  getSBackgroundClass,
  getShadowClass,
  getSpecialButtonClass,
} from "@/utils/stylesPage";

import { IoMdLock } from "react-icons/io";
import { HiPaintBrush } from "react-icons/hi2";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { PiSelectionBackground } from "react-icons/pi";

import type { PreviewProps, UserType } from "@/types";

import { useEffect, useState } from "react";

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
  /* START | Verificar session */
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const authToken = session.get("authToken");

  if (!authToken) {
    return redirect("/login");
  }
  /* END | Verificar session */

  /* START | Fetch de datos */
  const base = process.env.API_BASE;
  const urls = {
    user: `${base}/user`,
    links: `${base}/links`,
    backgrounds: `${base}/backgrounds`,
    userLinks: `${base}/user/links`,
  };

  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

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
      throw new Error("Failed to fetch data");
    }

    const [userData, linksData, backgroundsData, userLinksData] =
      await Promise.all([
        responses[0].json(),
        responses[1].json(),
        responses[2].json(),
        responses[3].json(),
      ]);
    return json({
      user: userData,
      links: linksData,
      backgrounds: backgroundsData,
      userLinks: userLinksData,
    });
  } catch (error) {
    return json({ error: error?.toString() });
  }
  /* END | Fetch de datos */
};

//action
export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const authToken = session.get("authToken");

  //delete
  if (request.method === "DELETE") {
    const linkId = (await request.formData()).get("link-id");
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
  const url = `${process.env.API_BASE}/user/link/store`;
  const defaultStyle = "bg-white rounded-xl shadow-md px-4 py-2 ";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        link_type_id: 1,
        title: "title 00073 dfvbdgfhfb sfdsf",
        url: "https://www.youtube.com/",
        style: `${defaultStyle}`,
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
type LoaderData = {
  user: UserType;
  links: any[];
  backgrounds: any[];
  userLinks: any[];
};

//component
export default function Styles() {
  const data = useLoaderData<LoaderData>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmittingStyle =
    navigation.state === "submitting" && navigation.formMethod === "POST";

  const { user, links, backgrounds, userLinks } = data;

  const previewLinks: PreviewProps[] = userLinks?.map(
    (userLink: PreviewProps) => {
      return {
        id: userLink.id,
        isHidden: userLink.isHidden,
        url: userLink.url,
        title: userLink.title,
        style: userLink.style,
      };
    }
  );
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

  return (
    <div className="min-h-screen bg-slate-200">
      <DashboarHeader />
      <h1 className=" mx-6 lg:hidden sm:text-center lg:text-left pt-6 sm:pt-10 pb-2 text-3xl uppercase font-bold border-b border-gray-400 border-solid flex items-center gap-1">
        <HiPaintBrush />
        Styles
      </h1>
      <div className=" grid lg:grid-cols-7">
        {/* preview */}
        <div className=" lg:col-start-6 lg:col-end-8 lg:row-start-1 lg:row-end-2 mt-8 lg:my-8 ">
          <div className=" sticky top-28 flex flex-col gap-4 items-center bg-white lg:bg-transparent mx-6 lg:mx-0 rounded-xl lg:rounded-none py-4 lg:py-0 ">
            {message && actionData && "error" in actionData && (
              <p className=" bg-red-500 text-center min-w-64 text-white px-4 py-2 rounded-full">
                {message}
              </p>
            )}
            {message && actionData && "message" in actionData && (
              <p className=" bg-green-500 w-64 text-center text-white px-4 py-2 rounded-full">
                {message}
              </p>
            )}
            <Preview data={previewLinks} user={user} />
            <Form method="post">
              <button
                disabled={isSubmittingStyle}
                className=" bg-gray-300 lg:bg-white w-64 rounded-full px-4 py-1 text-lg font-semibold hover:scale-105 transition-all"
              >
                {isSubmittingStyle ? "Saving..." : "Save"}
              </button>
            </Form>
          </div>
        </div>

        {/* styles */}
        <div className="max-w-[60rem] w-[100%] mx-auto lg:col-start-1 lg:col-end-6 lg:row-start-1 lg:row-end-2 self-center py-8 px-6 flex flex-col gap-8 ">
          <h1 className=" hidden py-2 text-3xl uppercase font-bold border-b border-gray-400 border-solid lg:flex items-center gap-1">
            <HiPaintBrush /> Styles
          </h1>

          {/* Buttons */}
          <div>
            <h2 className="text-xl font-bold mb-2 mx-auto flex items-center gap-1 ">
              <BsFillMenuButtonWideFill />
              Buttons
            </h2>

            <div className=" bg-white p-6 rounded-xl flex flex-col gap-10 max-w-[1000px] mx-auto">
              {/* colors */}
              <div>
                <p className=" pb-2">Fill</p>
                <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4  ">
                  <div className={` border border-gray-400 h-10 bg-white `} />
                  <div className={` border border-gray-400 h-10 bg-black `} />
                  <div
                    className={` border border-gray-400 h-10 bg-[#FD3E81] `}
                  />
                  <div
                    className={` border border-gray-400 h-10 bg-[#FF7F11] `}
                  />
                  <div
                    className={` border border-gray-400 h-10 bg-[#06BEE1] `}
                  />
                  <div
                    className={` border border-gray-400 h-10 bg-[#ABA194] `}
                  />
                </div>
              </div>

              {/* outline */}
              <div>
                <p className=" pb-2">Outline</p>
                <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4  ">
                  {/* se hace un copia del array que viene de la DB y se le aplica un reverse a la copia */}
                  {[...links[0].schemas[1].options]
                    .reverse()
                    .map((style, index) => {
                      const roundedClass = getRoundedClass(style);
                      return (
                        <div
                          key={index}
                          className={` border border-gray-400 h-10 ${roundedClass}`}
                        />
                      );
                    })}
                </div>
              </div>

              {/* shadow */}
              <div>
                <p className=" pb-2">Shadow</p>
                <div className=" grid grid-cols-1  sm:grid-cols-3 gap-6 sm:gap-4 ">
                  {links[0].schemas[2].options.map(
                    (style: string, index: number) => {
                      const shadowClass = getShadowClass(style);
                      return (
                        <div key={index} className=" relative z-0 h-10">
                          <div
                            className={` border border-gray-400 relative bg-white h-full ${shadowClass} `}
                          />

                          {style === "heavy" && (
                            <div
                              className={` h-full w-full bg-black absolute top-[0.30rem] left-[0.30rem] -z-10`}
                            />
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              {/* special */}
              <div>
                <div className=" flex gap-3 items-center pb-2">
                  <p>Special</p>
                  <p className=" bg-black text-white px-2 rounded-md flex items-center gap-1">
                    <span>Upgrade</span>
                    <IoMdLock />
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                </div>
              </div>
            </div>
          </div>

          {/* backgrounds */}
          <div>
            <h2 className="text-xl font-bold mb-2 max-w-[1000px] mx-auto flex items-center gap-1">
              <PiSelectionBackground />
              Backgrounds
            </h2>

            <div className=" bg-white p-4 rounded-xl max-w-[1000px] mx-auto">
              <div className=" grid grid-cols-1  sm:grid-cols-3 gap-4 ">
                {backgrounds.map((style, index) => {
                  const bg = getSBackgroundClass(style.name);
                  return (
                    <div key={index} className=" flex flex-col items-center">
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
    </div>
  );
}
