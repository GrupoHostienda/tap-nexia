import { FaPlus } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { RiLayoutTopLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

export default function BackOfficeMenu() {
  return (
    <>
      {/* Switch de botones */}
      <div className="grid grid-cols-2 border border-gray-400 w-52 rounded-full">
        <button className="bg-gray-950 text-white rounded-full p-3 px-5">
          Links
        </button>
        <button className="p-3  rounded-full">Store</button>
      </div>
      {/* Boton add link */}
      <div className="w-full">
        <button className="flex justify-center items-center bg-violet-600 hover:bg-violet-500 text-white rounded-full w-full p-3">
          <FaPlus />
          <p>Add Link</p>
        </button>
        <div className="flex justify-between pt-3">
          <button className="flex gap-2 justify-center items-center p-3 bg-slate-300 hover:bg-slate-400 border rounded-full">
            <RiLayoutTopLine />
            <p>Add Header</p>
          </button>
          <button className="flex gap-2 justify-center items-center p-3 bg-slate-300 hover:bg-slate-400 border rounded-full">
            <FiArchive />
            View archive
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </>
  );
}
