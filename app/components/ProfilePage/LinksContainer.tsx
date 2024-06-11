import LinkCard from "./LinkCard";
import { UserLinkType } from "@/types";

type LinkContainerProps = {
  data: UserLinkType[];
};

const LinksContainer = ({ data }: LinkContainerProps) => {
  return (
    <ul className=" flex flex-col gap-4 w-full ">
      {[...data].reverse().map((link, index) => (
        <LinkCard
          key={index}
          label={link.title}
          url={link.url}
          style={link.style?.class}
        />
      ))}
    </ul>
  );
};

export default LinksContainer;
