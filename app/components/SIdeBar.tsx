import React, { useEffect, useState } from "react";

import { FaMehBlank } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { MdOutlineDashboard } from "react-icons/md";

import SidebarContent from "@/components/SideBarContent";

import { Form, Link } from "@remix-run/react";

interface SidebarProps {
  title: string;
}

const Sidebar: React.FC<SidebarProps> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copy, setCopied] = useState("Copy");
  const [change, setSwitched] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const changeText = () => {
    setSwitched(true);
    navigator.clipboard.writeText("webpage url");
    setCopied("Copied");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSwitched(false);
      setCopied("Copy");
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [change]);

  return (
    <div>
      <div
        className={`fixed z-20 left-0 top-0 h-screen flex overflow-hidden transition-all duration-1000 transform ${
          isOpen ? " translate-x-0" : " -translate-x-full"
        }`}
      >
        {/* Sidebar */}
        <div className="z-20 bg-gray-800 w-64 pt-5 pb-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between px-4">
              <h2 className="text-white text-xl font-semibold">{title}</h2>
              <button
                onClick={toggleSidebar}
                className="text-gray-400 focus:outline-none focus:text-white"
                aria-label="Close sidebar"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <nav className="mt-5">
              <div className="space-y-1">
                <SidebarContent></SidebarContent>
              </div>

              <div className="mt-3 mx-2">
                <button
                  onClick={changeText}
                  className=" grid grid-cols-6 gap-3 items-center cursor-pointer group border border-gray-600 py-1 px-2 rounded-lg w-full text-white bg-gray-600 hover:bg-gray-700 transition-colors"
                >
                  <FaMehBlank className="text-2xl text-green-700" />
                  <span className=" col-span-3"> webpage url</span>
                  <span
                    id="url-for-copy"
                    className={`${
                      change ? "text-green-500" : "text-gray-950"
                    }  col-span-2 block group-active:scale-95 border border-transparent border-l-gray-500 border-dotted p-3 text-sm`}
                  >
                    {copy}
                  </span>
                </button>
              </div>
            </nav>
          </div>
          <div className=" flex w-full flex-col gap-2">
            <Link
              className=" text-white mx-2 py-1 bg-gray-600 hover:bg-gray-700 transition-colors rounded-md flex justify-center items-center gap-2 "
              to="/dashboard"
            >
              <MdOutlineDashboard /> Go to Dashboard
            </Link>
            <Form action="/logout" method="post" className="px-2">
              <button className=" w-full text-white px-2 py-1 bg-gray-600 hover:bg-gray-700 transition-colors rounded-md flex justify-center items-center gap-2 ">
                <CiLogout /> Log out
              </button>
            </Form>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="fixed top-4 left-0 sm:left-4 z-10 flex-shrink-0 flex h-16 scale-75">
        <button
          onClick={toggleSidebar}
          className="px-4 text-white hover:text-gray-600 focus:outline-none rounded-full hover:bg-gray-100 focus:text-gray-600 transition-colors"
          aria-label="Open sidebar"
        >
          <svg
            className="h-8 w-8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
