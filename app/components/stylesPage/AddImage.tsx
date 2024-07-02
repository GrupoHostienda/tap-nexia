/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
//import { UserType } from "@/types";
import { useFetcher } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import HeadingH2 from "../layout/HeadingH2";
import { FaPlus, FaRegUserCircle } from "react-icons/fa";
import { LuPaperclip } from "react-icons/lu";

//type
type FetcherData = {
  message?: string;
  error?: string;
};

//component
const AddImage = () => {
  //const { user }: LoaderDataType = useLoaderData();

  const fetcher = useFetcher<FetcherData>();

  const isSubmittingFetcher = fetcher.state !== "idle";

  const ref = useRef<HTMLInputElement>(null);

  //message from editImageAction
  const [imgMessage, setImgMessage] = useState("");
  useEffect(() => {
    if (fetcher.data && fetcher.data.message) {
      setImgMessage(fetcher.data.message);
      const timer = setTimeout(() => {
        setImgMessage(""); // Limpia el mensaje de error después de 4 segundos
      }, 4000);

      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    } else if (fetcher.data && fetcher.data.error) {
      setImgMessage(fetcher.data.error);
      const timer = setTimeout(() => {
        setImgMessage(""); // Limpia el mensaje de error después de 4 segundos
      }, 4000);

      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }
  }, [fetcher.data]);

  const [img, setImg] = useState<File | null>(null);

  //input type file
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };

  //ref button type button and input type file
  const handleButtonClick = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  //reset of imgState after form is sent
  useEffect(() => {
    if (fetcher.data?.message) {
      setImg(null);
      if (ref.current) {
        ref.current.value = "";
      }
    }

    // console.log(img);
  }, [fetcher]);

  return (
    <div>
      <HeadingH2 label="  Profile Image">
        <FaRegUserCircle />
      </HeadingH2>
      <div className=" bg-white p-4 rounded-xl flex flex-col gap-4 w-full">
        <div className=" flex items-center gap-1">
          <LuPaperclip />
          <h2>{!img ? "Attach Profile Image" : `${img?.name}`}</h2>
        </div>
        {/* form */}
        <fetcher.Form
          method="POST"
          action="/edit-profile-image"
          encType="multipart/form-data"
          className="flex sm:items-center flex-col sm:flex-row gap-4"
        >
          <div className=" flex-1">
            <button
              type="button"
              onClick={handleButtonClick}
              className="flex items-center justify-center md:justify-start w-full overflow-clip px-4 py-2 bg-gray-200 hover:bg-gray-300 transition-colors text-gray-500 rounded-full shadow-sm cursor-pointer"
            >
              <FaPlus className="pr-2 size-6" />
              <span>Add Image</span>
            </button>
            <input
              type="file"
              ref={ref}
              className="hidden"
              name="cover"
              onChange={handleInputChange}
            />
          </div>
          <button
            disabled={isSubmittingFetcher}
            className="bg-blue-700 text-white text-nowrap rounded-md hover:bg-blue-500 p-2 min-w-[100px] "
          >
            {!isSubmittingFetcher ? " Save Image" : "Saving..."}
          </button>
        </fetcher.Form>

        {/* fetcher messages*/}
        <div>
          {fetcher.data && fetcher.data.error && imgMessage && (
            <p className=" //bg-red-500 //w-64 //text-center text-red-500 //px-4 //py-2 //rounded-full">
              {imgMessage}
            </p>
          )}
          {fetcher.data && fetcher.data.message && imgMessage && (
            <p className=" //bg-green-500 //w-64 //text-center text-green-500 //px-4 //py-2 //rounded-full">
              {imgMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default AddImage;
