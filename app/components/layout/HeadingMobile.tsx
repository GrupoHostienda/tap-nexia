import { useOutletContext } from "@remix-run/react";
import { ReactNode, useState } from "react";

import { IoIosMenu } from "react-icons/io";

type HeadingMobileProps = {
  label: string;
  children: ReactNode;
};

// type OutletContextProps = {
//   state: { items: [], isSidebarOpen: boolean };
//   dispatch: React.Dispatch<React.SetStateAction<{}>>;
// };

const HeadingMobile = ({ children, label }: HeadingMobileProps) => {
  // const { state, dispatch } = useOutletContext<OutletContextProps>();
  // const [sidebarSwitch, toggleSidebar] = useState(state.isSidebarOpen)
  // const toggle = () => {
  //   toggleSidebar(!sidebarSwitch)
  //   console.log(sidebarSwitch)
  //   dispatch({type: 'sidebarToggle', payload: sidebarSwitch});
  // }
  return (
    <header className="heading lg:hidden  mx-6 pt-6 sm:pt-16 pb-2 flex items-center justify-between gap-1">
      <h1 className=" flex items-center gap-1">
        <div className=" text-base text-white bg-gray-500 p-2 rounded-full">
          {children}
        </div>
        <span>{label}</span>
      </h1>
      <div className=" sm:hidden">
        {/* <IoIosMenu className="cursor-pointer" onClick={toggle}/> */}
      </div>
    </header>
  );
};

export default HeadingMobile;
