import { FaXTwitter, FaFacebook, FaInstagram } from "react-icons/fa6";
import SocialItem from "./SocialItem";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { useLoaderData } from "@remix-run/react";
import { UserType } from "@/types";

type DataType = {
  user: UserType;
};

const SocialsContainer = () => {
  const { user } = useLoaderData<DataType>();
  return (
    <ul className=" flex justify-center gap-2 text-white ">
      {user.social_media.map((social, index) => {
        if (social.type.toLowerCase() === "twitter") {
          return (
            <SocialItem key={index} social={social}>
              <FaXTwitter />
            </SocialItem>
          );
        }
        if (social.type.toLowerCase() === "facebook") {
          return (
            <SocialItem key={index} social={social}>
              <FaFacebook />
            </SocialItem>
          );
        }
        if (social.type.toLowerCase() === "instagram") {
          return (
            <SocialItem key={index} social={social}>
              <FaInstagram />
            </SocialItem>
          );
        }
        if (social.type.toLowerCase() === "linkedin") {
          return (
            <SocialItem key={index} social={social}>
              <FaLinkedin />
            </SocialItem>
          );
        }
        if (social.type.toLowerCase() === "youtube") {
          return (
            <SocialItem key={index} social={social}>
              <FaYoutube />
            </SocialItem>
          );
        }
      })}
    </ul>
  );
};

export default SocialsContainer;
