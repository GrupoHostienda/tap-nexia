/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { json, redirect } from "@remix-run/node";

import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useOutletContext,
} from "@remix-run/react";

import { useEffect, useState } from "react";

import { getToken } from "@/services";

import { HiPaintBrush } from "react-icons/hi2";

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

import TwoColGridLayoutDratf from "@/components/layout/TwoColGridLayoutDratf";
import HeadingMobile from "@/components/layout/HeadingMobile";
import HeadingDesktop from "@/components/layout/HeadingDesktop";
import DashboarHeader from "@/components/DashboarHeader";
import Preview from "@/components/Preview";
import SocialMedia from "@/components/stylesPage/SocialMedia";
import Backgrounds from "@/components/stylesPage/Backgrounds";
import Biography from "@/components/stylesPage/Biography";
import AddImage from "@/components/stylesPage/AddImage";

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
  const authToken = await getToken(request);

  if (!authToken) {
    return redirect("/login");
  }

  const formData = await request.formData();

  const linkId = formData.get("link-id") as string; //delete
  const bio = formData.get("bio") as string;
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
        bio: bio,
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

//component
export default function Styles() {
  const { user, userLinks }: LoaderDataType = useLoaderData();

  const { background: backgroundState, bgToDBId }: ContextType =
    useOutletContext();

  const actionData = useActionData<typeof action>();

  const navigation = useNavigation();

  const isSubmittingStyle =
    navigation.state === "submitting" && navigation.formMethod === "POST";

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

            <div className="grid md:grid-cols-2 gap-8 md:gap-4">
              <div className=" md:order-2">
                <AddImage />
              </div>
              <div className=" md:order-1">
                <Biography />
              </div>
            </div>

            <SocialMedia />
            <Backgrounds />
          </div>
        </div>

        {/* preview | col-02 */}
        <div className="colSpan-02 order-1 lg:order-2 //bg-blue-500 ">
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
              <input hidden name="bio" value={user.home_page?.bio} readOnly />
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
                disabled={isSubmittingStyle || backgroundState === ""}
                className=" bg-gray-300 //bg-blue-700 //text-white lg:bg-white w-64 rounded-full px-4 py-1 font-semibold hover:scale-105 transition-all"
              >
                {isSubmittingStyle ? "Saving..." : "Save background"}
              </button>
            </Form>
          </div>
        </div>
      </TwoColGridLayoutDratf>
    </div>
  );
}
