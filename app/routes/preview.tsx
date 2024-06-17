import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";

import { motion } from "framer-motion";

import LinksContainer from "@/components/ProfilePage/LinksContainer";
import SocialsContainer from "@/components/SocialsContainer";
import DashboarHeader from "@/components/DashboarHeader";
import Sidebar from "@/components/SideBar";

import { ContextType, UserLinkType, UserType } from "@/types";

import { getToken } from "@/services";

import { twMerge } from "tailwind-merge";

/* function for meta data, for improving SEO */
export function meta() {
  return [
    {
      title: "Hostienda | Homepage",
    },
    {
      name: "description",
      content: "Home page",
    },
  ];
}

// loader para verificar sesión
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const authToken = await getToken(request);

  if (!authToken) {
    return redirect("/login");
  }

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
      console.log("error");
      throw new Error("Failed to fetch data");
    }

    const [userData, userLinksData] = await Promise.all([
      responses[0].json(),
      responses[1].json(),
    ]);

    console.log(userData);
    console.log(userLinksData);

    return json({
      user: userData,
      userLinks: userLinksData,
    });
  } catch (error) {
    return json({ error: error?.toString() });
  }
};

type DataType = {
  userLinks: UserLinkType[];
  user: UserType;
};

export default function Index() {
  const { userLinks: links, user: userdata } = useLoaderData<DataType>();

  const bgDB = userdata.home_page?.style; //bg-preview

  const { background }: ContextType = useOutletContext();

  return (
    <div className={twMerge("bg-slate-600 min-h-screen", bgDB, background)}>
      <DashboarHeader />
      <Sidebar title="Menu" />
      <div className=" pb-10 ">
        <div className="flex flex-col gap-10 pt-20 max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center flex-col gap-2">
            <div className=" relative ">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "tween",
                  duration: 0.2,
                }}
              >
                <img
                  src={
                    userdata.cover ? `${userdata.cover}` : "/avatar-user.png"
                  }
                  alt="avatar"
                  className=" bg-slate-100 rounded-[50%] w-24 h-24 object-cover mx-auto border-2 border-solid border-slate-200 "
                />
              </motion.div>

              <motion.span
                className="absolute bottom-0 right-0 text-4xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 125,
                  delay: 0.1,
                  duration: 0.7,
                }}
              >
                👋
              </motion.span>
            </div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className=" text-center capitalize text-slate-200"
            >
              <h2 className="  text-3xl font-bold">{userdata.username}</h2>
              <p className=" text-lg ">{userdata.role}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <LinksContainer data={links} />
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className=" text-white  text-2xl text-center capitalize flex //flex-col justify-center gap-2 //mb-14"
          >
            <SocialsContainer />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
