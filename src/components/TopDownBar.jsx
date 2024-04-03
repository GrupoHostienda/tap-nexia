import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosArrowForward, IoLogoFacebook } from "react-icons/io";
import {
  FaLinkedin,
  FaSnapchatSquare,
  FaWhatsappSquare,
  FaFacebookMessenger,
  FaMehBlank,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

function TopDownBar(props) {
  const [isOpen, setIsOpen] = useState(props.toggle);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
    }
  };

  return (
    <div className="relative">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-end "
        id="sidebar-container"
        onClick={toggleMenu}
      >
        <div className="bg-white lg:w-64 md:w-60 w-full h-full overflow-y-auto rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold fixed top-3 w-full px-10">
            Share this link
          </h2>
          <div className="p-3 absolute right-3 top-3 text-xl rounded-full hover:bg-gray-300">
            <IoClose className="" />
          </div>
          <ul className="mt-16">
            <li className="py-2 px-4 hover:bg-gray-100 flex justify-between items-center">
              <p className="flex items-center gap-4">
                <IoLogoFacebook className="text-2xl text-blue-700" />
                Share this on Facebook
              </p>
              <IoIosArrowForward />
            </li>
            <li className="py-2 px-4 hover:bg-gray-100 flex justify-between items-center">
              <p className="flex items-center gap-4">
                <FaLinkedin className="text-2xl text-blue-500" />
                Share this on Linkedin
              </p>
              <IoIosArrowForward />
            </li>
            <li className="py-2 px-4 hover:bg-gray-100 flex justify-between items-center">
              <p className="flex items-center gap-4">
                <FaSquareXTwitter className="text-2xl" />
                Share this on X
              </p>
              <IoIosArrowForward />
            </li>
            <li className="py-2 px-4 hover:bg-gray-100 flex justify-between items-center">
              <p className="flex items-center gap-4">
                <FaSnapchatSquare className="text-2xl text-yellow-300" />
                Share this on Snapchat
              </p>
              <IoIosArrowForward />
            </li>
            <li className="py-2 px-4 hover:bg-gray-100 flex justify-between items-center">
              <p className="flex items-center gap-4">
                <FaWhatsappSquare className="text-2xl text-green-600" />
                Share via Whatsapp
              </p>
              <IoIosArrowForward />
            </li>
            <li className="py-2 px-4 hover:bg-gray-100 flex justify-between items-center">
              <p className="flex items-center gap-4">
                <FaFacebookMessenger className="text-2xl" />
                Share via Messenger
              </p>
              <IoIosArrowForward />
            </li>
            <li className="py-2 px-4 hover:bg-gray-100 flex justify-between items-center">
              <p className="flex items-center gap-4">
                <MdEmail className="text-2xl text-gray-700" />
                Share via Email
              </p>
              <IoIosArrowForward />
            </li>
          </ul>
          <div className="mt-3 mx-4">
            <button className="flex gap-3 items-center border border-gray-600 p-4 rounded-lg w-full hover:bg-gray-200">
              <FaMehBlank className="text-2xl text-green-700" />
              <p>Lorem ipsum dolor</p>
              <span className="absolute right-8 border border-transparent border-l-gray-500 border-dotted p-3">Copy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopDownBar;
