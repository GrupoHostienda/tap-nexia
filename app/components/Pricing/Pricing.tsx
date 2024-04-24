import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import PriceCard from "./PriceCard";
import data from 'data.json'
const Pricing = () => {
    const {plans} = data
    const [visible, setVisibility] = useState(false)

  return (
    <div className={`${!visible? '':'hidden'}`}>
    <button
              onClick={() => setVisibility(!visible)}
              className="text-gray-400 focus:outline-none hover:text-white absolute top-3 right-4 z-50"
              aria-label="Close sidebar"
            ><IoIosClose className="size-9"/>
            </button>
      <div className="absolute top-10 w-full px-[16%] z-50">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <div className="bg-white h-[500px] w-72 rounded-lg border-2 border-purple-900">
          <PriceCard plan={plans.starter}/>
          </div>
          <div className="bg-white h-[500px] w-72 rounded-lg border-2 border-purple-900">
            <PriceCard plan={plans.pro}/>
          </div>
          <div className="bg-white h-[500px] w-72 rounded-lg border-2 border-purple-900">
          <PriceCard plan={plans.premium}/>
          </div>
        </div>
      </div>
      <div className="bg-black opacity-50 w-full h-screen fixed top-0 left-0 z-40"></div>
    </div>
  );
};

export default Pricing;
