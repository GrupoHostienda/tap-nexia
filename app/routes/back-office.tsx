import BackOfficeMenu from "@/components/BackOffice/BackOfficeMenu";
import CardBackOffice from "@/components/BackOffice/CardBackOffice";
import PreviewBackOffice from "@/components/BackOffice/PreviewBackOffice";
import data from "data.json";
import { useState } from "react";
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
  // const [previewData, setPreviewData] = useState<Object[]>([]);
  const linkList:Object[] = []
  
  return (
    <>
      <div className="absolute top-0 w-full lg:h-[100%] bg-slate-200 left-0 grid lg:grid-cols-[60%_30%] grid-cols-1 lg:gap-10 gap-2">
        <div className="w-full h-screen pt-7 px-7 flex flex-col gap-2">
          <BackOfficeMenu />
          <div className="flex flex-col gap-4 p-3 overflow-y-scroll h-screen hidden-scrollbar">
            {links.map((link, index) => {
              linkList.push(link)
              return (
                <div key={index}>
                  <CardBackOffice text={link.title} url={link.url}/>
                </div>
              );
            })
            }
          </div>
        </div>
        {/* Preview de elementos */}
        <div className="w-full h-screen flex items-center justify-center">
        
          
          <PreviewBackOffice data={linkList}/>
        </div>
      </div>
    </>
  );
}
