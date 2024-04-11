import { TbMenu } from "react-icons/tb";
import { LuLayoutPanelLeft, LuTrash2 } from "react-icons/lu";
import { GiRapidshareArrow } from "react-icons/gi";
import { CiImageOn, CiStar, CiCalendar, CiLock } from "react-icons/ci";
import { ImStatsBars2 } from "react-icons/im";
import { BsBoxArrowUp } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { useState } from "react";

type Card = {
  text: string,
  url: string,
  id: string
}

function CardBackOffice({ text, url, id }:Card) {

  const [linkActivated, linkActive] = useState(false)
  const cardActive = ()=>{
    linkActive(!linkActivated)
  }


  return (
    <>
      <div className="bg-gray-50 rounded-3xl w-full grid grid-cols-[5%_70%_20%] gap-2 p-3 shadow-md" key={id}>
        <div className="border-r self-center">
          <TbMenu />
        </div>
        <div className="grid grid-rows-[min-content_min-content_min-content] gap-3 p-3">
          <span className="text-wrap flex items-center gap-2">{text}<MdOutlineEdit className="opacity-50 hover:opacity-100 cursor-pointer"/></span>
          <span className="flex items-center gap-2">{url}<MdOutlineEdit className="opacity-50 hover:opacity-100 cursor-pointer"/></span>
          <div className="flex justify-between p-3 text-gray-600">
            <LuLayoutPanelLeft className="hover:cursor-pointer"/>
            <GiRapidshareArrow className="hover:cursor-pointer"/>
            <CiImageOn className="hover:cursor-pointer"/>
            <CiStar className="hover:cursor-pointer"/>
            <CiCalendar className="hover:cursor-pointer"/>
            <CiLock className="hover:cursor-pointer"/>
            <ImStatsBars2 className="hover:cursor-pointer"/>
          </div>
        </div>
        <div className="border-l p-2 flex justify-end">
          <div className="grid grid-cols-2 grid-rows-[min-content_1fr] gap-y-4 items-center cursor-pointer self-center">
            <div className="text-gray-700 font-medium flex justify-center">
              <BsBoxArrowUp />
            </div>
            <div className="relative" onClick={cardActive}>
              <input type="checkbox" className="sr-only" />
              <div className={`block ${linkActivated? `bg-green-400`: `bg-gray-600`} transition-colors w-14 h-8 rounded-full`}></div>
              <div className={`dot absolute ${linkActivated? `right-2`: `left-1`} transition-all top-1 bg-white w-6 h-6 rounded-full`}></div>
            </div>
            <div className="col-start-2 text-xl flex justify-center p-5 text-gray-700 hover:bg-gray-500 hover:text-white rounded-full transition-colors size-max">
              <LuTrash2/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardBackOffice;
