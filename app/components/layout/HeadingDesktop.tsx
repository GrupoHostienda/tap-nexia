import { ReactNode } from "react";

type HeadingDesktopProps = {
  label: string;
  children: ReactNode;
};

const HeadingDesktop = ({ children, label }: HeadingDesktopProps) => {
  return (
    <header className="heading hidden py-2 lg:pt-8 lg:block">
      <h1 className=" flex items-center gap-1">
        <div className=" text-base text-white bg-gray-500 p-2 rounded-full">
          {children}
        </div>
        <span>{label}</span>
      </h1>
    </header>
  );
};

export default HeadingDesktop;
