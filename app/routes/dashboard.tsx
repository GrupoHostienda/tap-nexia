import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { sessionStorage } from "@/utils/session.server";

import Preview from "@/components/Preview";
import { IoMdLock } from "react-icons/io";

import {
  SpecialButtonOne,
  SpecialButtonTwo,
} from "@/components/Dashboard/SpecialButtons";
import {
  getRoundedClass,
  getSBackgroundClass,
  getShadowClass,
  getSpecialButtonClass,
} from "@/utils/dashboard";

const DUMMY_DATA = [
  { url: "url1", title: "title1", styles: "" },
  { url: "url2", title: "title2", styles: "" },
  { url: "url3", title: "title3", styles: "" },
];

/* function for meta data, for improving SEO */
export function meta() {
  return [
    {
      title: "Hostienda | Dashboard",
    },
    {
      name: "description",
      content: "Dashboard page",
    },
  ];
}

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
  const urls = {
    links: `${process.env.API_BASE}/links`,
    backgrounds: `${process.env.API_BASE}/backgrounds`,
  };

  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

  try {
    const responses = await Promise.all([
      fetch(urls.links, { headers }),
      fetch(urls.backgrounds, { headers }),
    ]);

    if (!responses[0].ok || !responses[1].ok) {
      throw new Error("Failed to fetch data");
    }

    const [linksData, backgroundsData] = await Promise.all([
      responses[0].json(),
      responses[1].json(),
    ]);
    return json({ links: linksData, backgrounds: backgroundsData });
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

  /* START | Fetch de datos */
  const url = `${process.env.API_BASE}/user/link/store`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },

      body: JSON.stringify({
        link_type_id: 1,
        title: "title 01",
        url: "https://www.google.com/",
        style: "bg-red-700",
      }),
    });

    if (!response) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return json({ data });
  } catch (error) {
    return json({ error: error?.toString() });
  }
  /* END | Fetch de datos */
};

type DataType = {
  links: [
    {
      id: 1;

      name: "Button";

      hasSchema: 1;

      schemas: [
        { id: 1; property: "Color"; options: [] },

        {
          id: 2;

          property: "Border";

          options: ["round", "semi-round", "none"];
        },

        {
          id: 3;

          property: "Shadow";

          options: ["soft", "middle", "heavy", "none"];
        },

        { id: 4; property: "Special"; options: ["wave", "label", "triangle"] }
      ];
    }
  ];

  backgrounds: [
    { id: 1; name: "Flat"; plan: "1"; image: null },

    { id: 2; name: "Gradient"; plan: "2"; image: null }
  ];
};

export default function Dashboard() {
  const data = useLoaderData<DataType>();

  const { links, backgrounds } = data;
  return (
    <div className=" min-h-screen max-w-[1600px] mx-auto grid lg:grid-cols-7 gap-4 bg-slate-200 py-4 px-4 sm:px-6">
      <div className="col-span-5 flex flex-col gap-8 ">
        {/* Buttons */}
        <div>
          <h2 className="text-xl font-bold mb-2 max-w-[1000px] mx-auto">
            Buttons
          </h2>

          <div className=" bg-white p-4 rounded-lg flex flex-col gap-10 max-w-[1000px] mx-auto">
            {/* colors */}
            <div>
              <p className=" pb-2">Fill</p>
              <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4  ">
                <div className={` border border-gray-400 h-10 bg-white `} />
                <div className={` border border-gray-400 h-10 bg-black `} />
                <div className={` border border-gray-400 h-10 bg-[#FD3E81] `} />
                <div className={` border border-gray-400 h-10 bg-[#FF7F11] `} />
                <div className={` border border-gray-400 h-10 bg-[#06BEE1] `} />
                <div className={` border border-gray-400 h-10 bg-[#ABA194] `} />
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
                {links[0].schemas[2].options.map((style, index) => {
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
                })}
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
                {links[0].schemas[3].options.map((style, index) => {
                  const specialButtonClass = getSpecialButtonClass(style);
                  return (
                    <div
                      key={index}
                      className={`h-10 ${specialButtonClass}`}
                    ></div>
                  );
                })}
                <div className="  h-10 bg-black rounded-full"></div>
                <SpecialButtonOne />
                <SpecialButtonTwo />
              </div>
            </div>
          </div>
        </div>

        {/* backgrounds */}
        <div>
          <h2 className="text-xl font-bold mb-2 max-w-[1000px] mx-auto">
            Backgrounds
          </h2>

          <div className=" bg-white p-4 rounded-lg max-w-[1000px] mx-auto">
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

      {/* preview */}
      <div className="hidden lg:col-span-2 lg:block mx-auto ">
        <div className=" sticky top-10 flex flex-col gap-4">
          <Preview data={DUMMY_DATA} />
          <Form method="post">
            <button className=" bg-white w-full rounded-full px-4 py-1 text-lg font-semibold hover:scale-105 transition-all">
              Save
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
