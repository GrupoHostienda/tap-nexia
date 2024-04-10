import { FaPlus } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { RiLayoutTopLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
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

export default function LayoutBackOffice() {
  return (
    <>
      <div className="w-screen h-screen bg-slate-200 fixed left-0">
        <div className="absolute top-[8%] left-[10%] w-[48%] p-5 border-r flex flex-col gap-2">
          
          {/* Switch de botones */}
          <div className="grid grid-cols-2 gap-2 border border-gray-400 w-40 rounded-full">
            <button className="bg-gray-950 text-white rounded-full p-3 px-5">
              Links
            </button>
            <button className="p-3  rounded-full">Store</button>
          </div>
          {/* Boton add link */}
          <div className="w-full">
            <button className="flex justify-center items-center bg-violet-600 text-white rounded-full w-full p-3">
              <FaPlus />
              <p>Add Link</p>
            </button>
            <div className="flex justify-between pt-3">
              <button className="flex gap-2 justify-center items-center p-3 bg-slate-300 border rounded-full">
              <RiLayoutTopLine />
                <p>Add Header</p>
              </button>
              <button className="flex gap-2 justify-center items-center p-3 bg-slate-300 border rounded-full">
                <FiArchive />
                View archive
                <IoIosArrowForward />
              </button>
            </div>
          </div>

        </div>

        {/* <div className="w-[35%] h-screen">
            <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error alias iure repellat, impedit et qui facilis pariatur aut. Unde sunt fugiat ipsum ipsa culpa, iusto aut facilis! Eaque, est omnis.</span>
        </div> */}
      </div>
    </>
  );
}
