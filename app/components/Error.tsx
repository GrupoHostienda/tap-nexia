import { ReactNode } from "react";

type ErrorProps = {
  children: ReactNode;
};

const Error = ({ children }: ErrorProps) => {
  return (
    <p className="text-white bg-red-500 p-2 text-center capitalize font-semibold rounded-md">
      {children}
    </p>
  );
};

export default Error;
