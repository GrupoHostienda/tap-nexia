/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { UserType } from "@/types";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import HeadingH2 from "../layout/HeadingH2";
import { IoShareSocial } from "react-icons/io5";
import { CiEraser } from "react-icons/ci";
import { TiSocialTwitter } from "react-icons/ti";
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

//para el select
const selectOptions = [
  { type: "Facebook", value: "Facebook" },
  { type: "Twitter", value: "Twitter" },
  { type: "Instagram", value: "Instagram" },
  { type: "Linkedin", value: "Linkedin" },
  { type: "Youtube", value: "Youtube" },
];

//component
const SocialMedia = () => {
  const { user }: LoaderDataType = useLoaderData();

  const fetcher = useFetcher<FetcherData>();

  const isSubmittingFetcher = fetcher.state !== "idle"; //for adding links

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

  const initialSocialLinksDB = selectOptions.map((option) => {
    const existingLink = user?.social_media?.find(
      (link) => link.type === option.type
    );
    return existingLink ? existingLink : { type: option.type, url: "" };
  });

  const [socialLinksState, setSocialLinksState] =
    useState(initialSocialLinksDB);

  // select add-link
  const [selectedSocial, setSelectedSocial] = useState(
    initialSocialLinksDB[0].type
  );
  const [socialInput, setSocialInput] = useState(initialSocialLinksDB[0].url); //controlled add-link input

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSocialInput(newValue);

    const updatedLinksState = socialLinksState?.map((link) =>
      link.type === selectedSocial ? { ...link, url: newValue } : link
    );
    setSocialLinksState(updatedLinksState);
  };

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

  return (
    <div>
      <HeadingH2 label="  Social Media">
        <IoShareSocial />
      </HeadingH2>
      <div className=" bg-white p-4 rounded-xl flex flex-col gap-4 w-full">
        <div className=" flex items-center gap-1">
          <PiPlus />
          <h2>Add Social Media links</h2>
        </div>

        {/* form */}
        <fetcher.Form
          method="POST"
          action="/add-social-media-link"
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
          <div className="w-full flex-1 relative">
            {/* input */}
            <input
              className="w-full h-full focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-200 rounded-md py-2 pl-2 pr-8"
              type="text"
              name="social-link"
              placeholder={`https://www.${selectedSocial}.com/username...`}
              value={socialInput}
              onChange={handleInputChange}
            />

            {/* eraser icon */}
            <div
              className=" group absolute top-1/2 -translate-y-1/2 text-xl right-2 text-red-500 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setSocialInput("");
                const updatedLinksState = socialLinksState?.map((link) =>
                  link.type === selectedSocial ? { ...link, url: "" } : link
                );
                setSocialLinksState(updatedLinksState);
              }}
            >
              <CiEraser />
              <div className="absolute bottom-full mb-1 hidden text-xs text-nowrap text-white bg-gray-600 rounded p-1 group-hover:block transition-all">
                Erase URL
              </div>
            </div>

            {/* hidden inputs que van al action */}
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
            className="bg-blue-700 text-white text-nowrap rounded-md hover:bg-blue-500 p-2 min-w-[100px]"
          >
            {!isSubmittingFetcher ? " Save Social" : "Saving..."}
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
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
            praesentium placeat. Sunt esse explicabo optio illum itaque rerum,
            velit, repudiandae ipsam, accusamus corrupti id sapiente.
            Praesentium dicta aliquam impedit labore!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
