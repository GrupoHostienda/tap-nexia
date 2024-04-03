import LinkCard from "./LinkCard";
import data from "../../data.json";
const { links } = data;

const LinksContainer = () => {
  return (
    <ul className=" flex flex-col gap-4 w-full ">
      {links.map((link, index) => (
        <LinkCard key={index} label={link.title} url={link.url} />
      ))}
    </ul>
  );
};

export default LinksContainer;
