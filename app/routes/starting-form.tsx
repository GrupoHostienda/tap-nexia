import { IconType } from "react-icons";
import data from "data.json";
import { useState } from "react";
import SelectorIcono from "@/components/StartingForm/Categories";
import React from "react";

export function meta() {
  return [
    {
      title: "Hostienda | starting form",
    },
    {
      name: "Starting form",
      content: "Starting form",
    },
  ];
}

// interface Button{
//   icon: IconType
//   title: string
// }

const StartingForm = () => {
  const { categories } = data; 

  //  const add:IconType = require('react-icons/md').MdAdd
  return (
    <>
      <div className="grid lg:grid-cols-[70%_30%] h-screen w-screen">
        <div className="size-full flex flex-col gap-2 items-center justify-center">
          <div className="flex flex-col gap-2 p-4">
            <h1 className="font-extrabold text-4xl">Tell us about yourself</h1>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            <div className="flex gap-2 flex-wrap w-[600px]">
              {categories.map((categ, index) => {
                return (
                  <button className="border flex gap-2 items-center rounded-full py-2 px-4 hover:bg-slate-200 transition-colors">
                    <SelectorIcono nombreIcono={categ.icon} />
                    {categ.title}
                  </button>
                );
              })}
            </div>
            <button
              className="w-full p-5 bg-gray-200 text-gray-400 rounded-full"
              disabled
            >
              Continue
            </button>
          </div>
        </div>
        <div className="flex h-full items-center justify-center w-full p-4 border-2 bg-gradient-to-bl from-blue-800 to-blue-100"></div>
      </div>
    </>
  );
};

export default StartingForm;
