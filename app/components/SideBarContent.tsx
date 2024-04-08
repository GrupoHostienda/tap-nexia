import data from "data.json";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaSpotify,
  FaXTwitter,
} from "react-icons/fa6";

const { socials } = data;
console.log(socials)

function SidebarContent() {
  const content = (
    <div>
      {socials.map((link, index) => {
        if (link.title.toLowerCase() === "x") {
          return (
            <a
              href={link.url}
              key={index}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium flex gap-3 items-center"
            >
              <FaXTwitter />
              Find me in X
            </a>
          );
        }
        if (link.title.toLowerCase() === "facebook") {
          return (
            <a
              href={link.url}
              key={index}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium flex gap-3 items-center"
            >
              <FaFacebook />
              Find me in Facebook
            </a>
          );
        }
        if (link.title.toLowerCase() === "instagram") {
          return (
            <a
              href={link.url}
              key={index}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium flex gap-3 items-center"
            >
              <FaInstagram />
              Find me in Instagram
            </a>
          );
        }
        if (link.title.toLowerCase() === "spotify") {
          return (
            <a
              href={link.url}
              key={index}
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium flex gap-3 items-center"
            >
              <FaSpotify />
              Find me in Spotify
            </a>
          );
        }
      })}
    </div>
  );

  const icons: Array<React.ReactElement> = [
    <FaXTwitter />,
    <FaFacebook />,
    <FaInstagram />,
    <FaSpotify />,
  ];

  return content;
}

export default SidebarContent;
