//import React from "react";
import BackOfficeMenu from "@/components/BackOffice/BackOfficeMenu";
import CardBackOffice from "@/components/BackOffice/CardBackOffice";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { sessionStorage } from "@/utils/session.server";

import DashboarHeader from "@/components/DashboarHeader";
import { validateUrl } from "@/utils/helpers";
import HeadingMobile from "@/components/layout/HeadingMobile";
import { BsLayoutWtf } from "react-icons/bs";
import TwoColGridLayoutDratf from "@/components/layout/TwoColGridLayoutDratf";
import HeadingDesktop from "@/components/layout/HeadingDesktop";
import Preview from "@/components/Preview";

export function meta() {
  return [
    {
      title: "Back Office - Page",
    },
    {
      name: "description",
      content: "Back Office - Page",
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
    userLinks: `${base}/user/links`,
  };

  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

  try {
    const responses = await Promise.all([
      fetch(urls.user, { headers }),
      fetch(urls.userLinks, { headers }),
    ]);

    if (!responses[0].ok || !responses[1].ok) {
      throw new Error("Failed to fetch data");
    }

    const [userData, userLinksData] = await Promise.all([
      responses[0].json(),
      responses[1].json(),
    ]);

    return json({
      user: userData,
      userLinks: userLinksData,
    });
  } catch (error) {
    return json({ error: error?.toString() });
  }
  /* END | Fetch de datos */
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const authToken = session.get("authToken");
  if (request.method === "POST") {
    const formData = await request.formData();
    const formType = formData.get("formType");
    const title = formData.get("title") as string;
    const link = formData.get("link") as string;

    console.log(link);
    console.log(title);

    const defaultStyle = "bg-white rounded-full shadow-md text-black";

    switch (formType) {
      case "add":
        if (title.trim() === "" || link.trim() === "") {
          return json({ error: "All fields are required." });
        }

        if (!validateUrl(link)) {
          return json({ error: "Is not a valid URL." });
        }

        try {
          const response = await fetch(
            `${process.env.API_BASE}/user/link/store`,
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
                style: `${defaultStyle}`,
              }),
            }
          );

          if (!response) {
            throw new Error("Failed to fetch data");
          }

          const data = await response.json();

          return json({ data });
        } catch (error) {
          return json({ error: error?.toString() });
        }
      case "update":
        const linkVisible = formData.get("isHidden");
        console.log("ejecutando update");
        console.log(title);
        try {
          const response = await fetch(
            `${process.env.API_BASE}/user/link/update/2`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
              body: JSON.stringify({
                isHidden: linkVisible,
              }),
            }
          );
          if (!response) {
            throw new Error("Failed to fetch data");
          }
          console.log(response.status);
          const data = await response.json();
          console.log(data);
          return json({ data });
        } catch (error) {
          return json({ error: error?.toString() });
        }
        break;
    }
  }

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
};

type DataType = {
  links: [{ tittle: string; link: string; id: number; isHidden: number }];
};

export default function LayoutBackOffice() {
  const { userLinks: links, user: data } = useLoaderData<DataType>();

  const list = links.slice().reverse();
  return (
    <div className=" pageLayout bg-slate-200">
      <DashboarHeader />
      <HeadingMobile label="Back-Office">
        <BsLayoutWtf />
      </HeadingMobile>

      <TwoColGridLayoutDratf>
        {/* back-office | col-01 */}
        <div className="colSpan-01 order-2 lg:order-1 //bg-blue-500">
          <div className=" max-w-[60rem] w-[100%] mx-auto h-screen pt-7 px-7 flex flex-col gap-2">
            <HeadingDesktop label="Back-Office">
              <BsLayoutWtf />
            </HeadingDesktop>

            <BackOfficeMenu />

            <div></div>
            <div className="flex flex-col gap-4 p-3 overflow-y-scroll h-screen hidden-scrollbar">
              {list.map((link, index: number) => {
                return (
                  <div key={index}>
                    <CardBackOffice link={link} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* preview | col-02 */}
        <div className="colSpan-02 order-1 lg:order-2 //bg-red-500">
          <div className="sticky top-20 flex flex-col gap-4 items-center  bg-white lg:bg-transparent my-8 mx-6 lg:mx-0 rounded-xl lg:rounded-none py-4  lg:py-0 ">
            <div className=" lg:h-10"></div>

            <Preview data={links} user={data} />
          </div>
        </div>
      </TwoColGridLayoutDratf>
    </div>
  );
}
