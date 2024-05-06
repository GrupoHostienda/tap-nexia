import { ReactNode } from "react";

type TwoColGridLayoutProps = {
  children?: ReactNode;
  location?: string;
  stylesCol1?: string;
  stylesCol2?: string;
};

const TwoColGridLayout = ({
  children,
  location,
  stylesCol1,
  stylesCol2,
}: TwoColGridLayoutProps) => {
  return (
    <div className="  min-h-screen grid md:grid-cols-7 bg-gray-50">
      <div
        className={`rounded-md max-w-[37.5rem] w-[80%] mx-auto col-span-5 self-center py-8 ${stylesCol1}`}
      >
        {children}
      </div>

      {/* Imagen lateral */}
      <div
        className={`min-h-screen hidden md:block md:col-span-2 ${stylesCol2}`}
      ></div>
      {(location === "/login" || location === "/register") && (
        <button className="p-4 sm:p-5 rounded-full bg-violet-800 text-white text-xl fixed bottom-4 right-4 hover:bg-violet-700">
          <p className="w-7 h-7">?</p>
        </button>
      )}
    </div>
  );
};

export default TwoColGridLayout;
