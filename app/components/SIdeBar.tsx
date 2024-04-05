import React, { useState } from 'react';

interface SidebarProps {
  title: string;
  children: React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div className={`bg-gray-800 w-64 pt-5 pb-4 ${isOpen ? 'block' : 'hidden'}`}>
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
            {children}
          </div>
        </nav>
      </div>

      {/* Button */}
      <div className="flex-1 overflow-auto focus:outline-none">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
          <button
            onClick={toggleSidebar}
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 lg:hidden"
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
    </div>
  );
};

export default Sidebar;
