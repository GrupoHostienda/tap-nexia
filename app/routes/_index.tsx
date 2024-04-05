import LinksContainer from "@/components/LinksContainer";
import SocialsContainer from "@/components/SocialsContainer";
import Sidebar from "@/components/SIdeBar";
import data from "data.json";
/* function for meta data, for improving SEO */
export function meta() {
  return [
    {
      title: "Landing - Page",
    },
    {
      name: "description",
      content: "Landing - Page",
    },
  ];
}

export default function Index() {
  return (
    <div className="flex flex-col gap-10 pt-20">
      <div className=" flex flex-col gap-2">
        <img
          src={data.avatar}
          alt="avatar"
          className=" bg-slate-100 rounded-[50%] w-24 h-24 object-cover mx-auto border-2 border-solid border-slate-200 "
        />
        <div className=" text-center capitalize text-slate-200">
          <h2 className="  text-3xl font-bold">{data.name}</h2>
          <p className=" text-lg ">{data.desc}</p>
        </div>
      </div>

      <LinksContainer />

      <SocialsContainer />

      <Sidebar title="Sidebar">
        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Link 1</a>
        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Link 2</a>
        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Link 3</a>
      </Sidebar>
    </div>
  );
}
