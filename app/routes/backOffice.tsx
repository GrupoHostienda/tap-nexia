import BackOfficeMenu from "@/components/BackOfficeMenu";
import CardBackOffice from "@/components/CardBackOffice";
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
        <div className="absolute top-[8%] left-[10%] w-[60%] p-5 border-r flex flex-col gap-2">

          <BackOfficeMenu/>
          <CardBackOffice text="Lorem ipsum" url="Lorem.com" id="1" />

        </div>

        {/* <div className="w-[35%] h-screen">
            <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error alias iure repellat, impedit et qui facilis pariatur aut. Unde sunt fugiat ipsum ipsa culpa, iusto aut facilis! Eaque, est omnis.</span>
        </div> */}
      </div>
    </>
  );
}
