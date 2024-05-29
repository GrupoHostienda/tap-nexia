import { ReactNode } from "react";

type HeadingH2Props = {
  label: string;
  children: ReactNode;
};

const HeadingH2 = ({ children, label }: HeadingH2Props) => {
  return (
    <h2 className="text-xl font-bold mb-2 flex items-center gap-1 ">
      {children}
      <span>{label}</span>
    </h2>
  );
};

export default HeadingH2;
