import BackOfficeMenu from "@/components/BackOfficeMenu";
import CardBackOffice from "@/components/CardBackOffice";
import data from "data.json"
import { isReactElement } from "framer/utils/type-guards.js";
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

  const {links} = data

  return (
    <>
      <div className="absolute top-0 w-full h-[100%] bg-slate-200 left-0 grid grid-cols-[60%_20%] gap-10">
        <div className="ml-10 w-full h-screen pt-5 px-5 flex flex-col gap-2">

          <BackOfficeMenu/>
          <div className="flex flex-col gap-4 p-3 overflow-y-scroll h-screen">

          {links.map((link, index) =>{
            return <CardBackOffice text={link.title} url={link.url} id={index} />
          })}

          </div>
        </div>
{/* Preview de elementos */}
        <div className="w-full h-screen">
            <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error alias iure repellat, impedit et qui facilis pariatur aut. Unde sunt fugiat ipsum ipsa culpa, iusto aut facilis! Eaque, est omnis.</span>
        </div>
      </div>
    </>
  );
}
