import React, { useState } from 'react';
import { FaMehBlank } from 'react-icons/fa';
import SidebarContent from "@/components/SideBarContent";

interface SidebarProps {
  title: string;
}

const Sidebar: React.FC<SidebarProps> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copy, setCopied] = useState("Copy");
  const [change, setSwitched] = useState(false)
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const changeText = () => {
    if(change){
      setCopied("Copy")
      setSwitched(!change)
    }else{
      setCopied("Copied")
      setSwitched(!change)
    }
  }

  return (
    <div className={`fixed top-0 h-screen flex overflow-hidden transition-all ${isOpen ? 'left-0' : '-left-full'}`}>
      {/* Sidebar */}
      <div className={`z-20 bg-gray-800 w-64 pt-5 pb-4`}>
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
          <div className="mt-3 mx-4">
            <button onClick={changeText} className="flex gap-3 items-center border border-gray-600 p-4 rounded-lg w-full text-white bg-gray-600">
              <FaMehBlank className="text-2xl text-green-700" />
              <p className="">Lorem ipsum dolor</p>
              <span id="url-for-copy" className={`${change? "text-green-500": "text-gray-950"} border border-transparent border-l-gray-500 border-dotted p-3`}>{copy}</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Button */}
      
        <div className="fixed top-4 left-4 z-10 flex-shrink-0 flex h-16">
          <button
            onClick={toggleSidebar}
            className="px-4 text-white hover:text-gray-600 focus:outline-none rounded-full hover:bg-gray-100 focus:text-gray-600 transition-colors"
            aria-label="Open sidebar"
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
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          
        </div>
    </div>
  );
};

export default Sidebar;
