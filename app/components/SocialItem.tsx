import { ReactNode } from "react";

type SocialItemProps = {
  social: {
    title: string;
    url: string;
  };
  children: ReactNode;
};

const SocialItem = ({ social, children }: SocialItemProps) => {
  return (
    <li className=" hover:scale-125 transition-all cursor-pointer">
      <a href={social.url}>{children}</a>
    </li>
  );
};

export default SocialItem;
