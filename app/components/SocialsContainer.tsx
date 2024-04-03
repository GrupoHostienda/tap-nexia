import {
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaSpotify,
} from "react-icons/fa6";
import SocialItem from "./SocialItem";
import data from "data.json";

const { socials } = data;

const SocialsContainer = () => {
  return (
    <ul className=" flex justify-center gap-2 text-white text-2xl">
      {socials.map((social, index) => {
        if (social.title.toLowerCase() === "x") {
          return (
            <SocialItem key={index} social={social}>
              <FaXTwitter />
            </SocialItem>
          );
        }
        if (social.title.toLowerCase() === "facebook") {
          return (
            <SocialItem key={index} social={social}>
              <FaFacebook />
            </SocialItem>
          );
        }
        if (social.title.toLowerCase() === "instagram") {
          return (
            <SocialItem key={index} social={social}>
              <FaInstagram />
            </SocialItem>
          );
        }
        if (social.title.toLowerCase() === "spotify") {
          return (
            <SocialItem key={index} social={social}>
              <FaSpotify />
            </SocialItem>
          );
        }
      })}
    </ul>
  );
};

export default SocialsContainer;
