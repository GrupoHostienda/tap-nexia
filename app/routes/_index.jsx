import LinksContainer from "../components/LinksContainer";
import SocialsContainer from "../components/SocialsContainer";
import data from "../../data.json";
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
/* component */
export default function Index() {
  return (
    <div className="flex flex-col gap-10 pt-20">
      {/* general info */}
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

      {/* links */}
      <LinksContainer />

      {/* socials */}
      <SocialsContainer />
    </div>
  );
}
