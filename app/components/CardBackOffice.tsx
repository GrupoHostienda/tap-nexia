import { TbMenu } from "react-icons/tb";
import { LuLayoutPanelLeft } from "react-icons/lu";
import { GiRapidshareArrow } from "react-icons/gi";
import { CiImageOn, CiStar, CiCalendar, CiLock } from "react-icons/ci";
import { ImStatsBars2 } from "react-icons/im";
import { BsBoxArrowUp } from "react-icons/bs";

function CardBackOffice(){
    return <>
    <div className="bg-gray-50 rounded-xl w-full grid grid-cols-[10%_65%_20%] gap-2 p-3">
    <div className="border-r self-center"><TbMenu /></div>
    <div className="flex flex-col p-3">
        <span className="text-wrap">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique nisi rerum, excepturi natus, aliquid qui ex perspiciatis quas corporis nulla accusamus aliquam.
    </span>
    <span>
        URL
    </span>
    <div className="flex gap-2 p-3 text-gray-600">
    <LuLayoutPanelLeft />
    <GiRapidshareArrow />
    <CiImageOn />
    <CiStar />
    <CiCalendar />
    <CiLock />
    <ImStatsBars2 />
    </div>
    </div>
    <div className="border-l">
    <label className="flex items-center cursor-pointer">
  <div className="relative">
    <input type="checkbox" className="sr-only"/>
    <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
    <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
  </div>
  <div className="ml-3 text-gray-700 font-medium"><BsBoxArrowUp /></div>
</label>

    </div>
    </div>
    </>
}

export default CardBackOffice