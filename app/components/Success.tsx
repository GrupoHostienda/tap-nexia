import { ReactNode } from "react";

type SuccessProps = {
  children: ReactNode;
};

const Success = ({ children }: SuccessProps) => {
  return (
    <p className="text-white bg-green-500 p-2 text-center capitalize font-semibold rounded-md">
      {children}
    </p>
  );
};

export default Success;
