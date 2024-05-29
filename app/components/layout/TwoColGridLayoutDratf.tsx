import { ReactNode } from "react";

type TwoColGridLayoutProps = {
  children: ReactNode;
  style?: string;
};

const TwoColGridLayoutDratf = ({ children, style }: TwoColGridLayoutProps) => {
  return (
    <div className={` grid min-h-screen lg:grid-cols-7 ${style}`}>
      {children}
    </div>
  );
};

export default TwoColGridLayoutDratf;
