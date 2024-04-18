//import React from "react";
import BackOfficeMenu from "@/components/BackOffice/BackOfficeMenu";
//import CardBackOffice from "@/components/BackOffice/CardBackOffice";
//import PreviewBackOffice from "@/components/BackOffice/PreviewBackOffice";
//import { GlobalStateProvider } from "@/components/Context/GlobalContext";
import data from "data.json";
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
  const { links } = data;
  // const {state,dispatch} = useGlobalState()
  // const {items} = state

  return (
    <>
      <div className="absolute top-0 w-full lg:h-[100%] bg-slate-200 left-0 grid lg:grid-cols-[60%_30%] grid-cols-1 lg:gap-10 gap-2">
        <div className="w-full h-screen pt-7 px-7 flex flex-col gap-2">
          <BackOfficeMenu />
          <div></div>
          <CardBackOffice />
          {/* <div className="flex flex-col gap-4 p-3 overflow-y-scroll h-screen hidden-scrollbar">
            {items.map((link, index) => {
              
              return (
                <div key={index}>
                  <CardBackOffice text={link.text} url={link.url} active={false} id={index}/>
                </div>
              );
            })
            }
          </div> */}
        </div>
        {/* Preview de elementos */}
        <div className="w-full h-screen flex items-center justify-center">
          <PreviewBackOffice data={links} />
        </div>
      </div>
    </>
  );
}
