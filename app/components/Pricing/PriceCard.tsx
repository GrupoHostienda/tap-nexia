import { useState } from "react";

interface PlanCard {
  title: string;
  isfor: string;
  items: string[];
  price: string;
  payplan: string;
}

const PriceCard = ({ plan }: { plan: PlanCard }) => {
  const [checked, isChecked] = useState(false);
  const check = () => {
    isChecked(!checked);
  };

  // const {isfor, items, price, payplan} = plan.object
  console.log(plan);
  return (
    <div className="grid grid-cols-1 grid-rows-[100px_263px_min-content] gap-3 h-full">
      <div
        className={`${
          checked ? "bg-purple-900 text-white" : "text-black"
        } w-full h-[100px] flex rounded-t-2xl justify-between px-6 items-center`}
      >
        {plan.title == "Pro" && (
          <div className="absolute lg:-top-4 top-[33%] flex justify-center items-center w-[274px]">
            <div className="bg-lime-400 text-black p-2 rounded-full">
            Try Pro for free
            </div>
          </div>
        )}
        <span>
          <h1 className="text-2xl">{plan.title}</h1>
          <p className="text-sm">{plan.isfor}</p>
        </span>
        <div>
          <input
            checked={checked}
            className="size-5 bg-transparent"
            type="checkbox"
            onClick={check}
          />
        </div>
      </div>
      {/* Lista de elementos */}
      <div className="px-4">
        <h1 className="text-xl font-bold">{plan.isfor}</h1>
        <ul className="text-xs p-2 flex flex-col gap-2">
          {plan.items.map((item, index) => {
            return <li>{item}</li>;
          })}
        </ul>
      </div>
      {/* footer de card */}
      <div className="px-4">
        <h2 className="text-2xl font-bold">{plan.price}</h2>
        <p className="text-xs">{plan.payplan}</p>
      </div>
    </div>
  );
};

export default PriceCard;
