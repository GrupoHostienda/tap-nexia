import { ReactNode } from "react";
import { IoMdLock } from "react-icons/io";

type Buttonsrops = {
  label: string;
  children: ReactNode;
  mustUpgrade?: boolean;
};

const Buttons = ({ children, label, mustUpgrade = false }: Buttonsrops) => {
  return (
    <div>
      <div className=" flex gap-3 items-center pb-2">
        <p className=" pb-2 capitalize">{label}</p>
        {mustUpgrade && (
          <p className=" bg-black text-white px-2 rounded-md flex items-center gap-1">
            <span>Upgrade</span>
            <IoMdLock />
          </p>
        )}
      </div>

      <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4  ">{children}</div>
    </div>
  );
};

export default Buttons;
