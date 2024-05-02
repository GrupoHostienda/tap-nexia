import { ReactNode } from "react";

type TwoColGridLayoutProps = {
  children?: ReactNode;
  styles?: string;
};

const TwoColGridLayout = ({ children, styles }: TwoColGridLayoutProps) => {
  return (
    <div className="  min-h-screen grid md:grid-cols-7 bg-gray-50">
      <div
        className={`rounded-md max-w-[37.5rem] w-[80%] mx-auto col-span-5 self-center py-8 ${styles}`}
      >
        {children}
      </div>

      {/* Imagen lateral */}
      <div className=" md:bg-gray-800 min-h-screen hidden md:block md:col-span-2"></div>
      <button className="p-4 sm:p-5 rounded-full bg-violet-800 text-white text-xl fixed bottom-4 right-4 hover:bg-violet-700">
        <p className="w-7 h-7">?</p>
      </button>
    </div>
  );
};

export default TwoColGridLayout;
