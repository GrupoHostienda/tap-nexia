/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { motion } from "framer-motion";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdLock } from "react-icons/io";
import HeadingH2 from "../layout/HeadingH2";
import { PiSelectionBackground } from "react-icons/pi";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { BackgroundType, ContextType, UserType } from "@/types";
import { getSBackgroundClass } from "@/utils/stylesPage";

//type
type LoaderDataType = {
  user: UserType;
  backgrounds: BackgroundType[];
};

//component
const Backgrounds = () => {
  const { user, backgrounds }: LoaderDataType = useLoaderData();

  const {
    background: backgroundState,
    setBackground,
    setBgToDBId,
  }: ContextType = useOutletContext();

  const bgDB = user?.home_page?.background.name; //bg-preview

  return (
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
  );
};

export default Backgrounds;
