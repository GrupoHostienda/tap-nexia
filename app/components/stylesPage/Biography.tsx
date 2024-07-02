/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { UserType } from "@/types";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import HeadingH2 from "../layout/HeadingH2";
import { CiEraser } from "react-icons/ci";
import { LuMessageSquarePlus } from "react-icons/lu";
import { PiPlus } from "react-icons/pi";

//type
type LoaderDataType = {
  user: UserType;
};

//type
type FetcherData = {
  message?: string;
  error?: string;
};

//component
const Biography = () => {
  const { user }: LoaderDataType = useLoaderData();

  const fetcher = useFetcher<FetcherData>();

  const isSubmittingFetcher = fetcher.state !== "idle"; //for adding bio

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

  const [bio, setBio] = useState(user.home_page?.bio); //controlled bio input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  return (
    <div>
      <HeadingH2 label="  Biography">
        <LuMessageSquarePlus />
      </HeadingH2>
      <div className=" bg-white p-4 rounded-xl flex flex-col gap-4 w-full">
        <div className=" flex items-center gap-1">
          <PiPlus />
          <h2>Add Biography Message</h2>
        </div>

        {/* form */}
        <fetcher.Form
          method="POST"
          action="/add-biography"
          className="flex sm:items-center flex-col sm:flex-row gap-4"
        >
          <div className="w-full flex-1 relative">
            {/* input */}
            <input
              className="w-full h-full focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-200 rounded-md py-2 pl-2 pr-8"
              type="text"
              name="social-link"
              placeholder={`Hi, I'm ${user.username}, welcome...`}
              value={bio}
              onChange={handleInputChange}
            />

            {/* eraser icon */}
            <div
              className=" group absolute top-1/2 -translate-y-1/2 text-xl right-2 text-red-500 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setBio("");
              }}
            >
              <CiEraser />
              <div className="absolute bottom-full mb-1 hidden text-xs text-nowrap text-white bg-gray-600 rounded p-1 group-hover:block transition-all">
                Erase Biography
              </div>
            </div>

            {/* hidden inputs que van al action */}
            <input hidden name="bio" value={bio} readOnly />
            <input
              hidden
              name="backgroundId"
              value={user.home_page?.background.id}
              readOnly
            />
            <input
              hidden
              name="backgroundStyle"
              value={user.home_page?.style}
              readOnly
            />
          </div>
          <button
            disabled={isSubmittingFetcher}
            className="bg-blue-700 text-white text-nowrap rounded-md hover:bg-blue-500 p-2 min-w-[100px] "
          >
            {!isSubmittingFetcher ? " Save Bio" : "Saving..."}
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
      </div>
    </div>
  );
};
export default Biography;
