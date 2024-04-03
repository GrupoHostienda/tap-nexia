import LinkCard from "./LinkCard";
import data from "data.json";

const LinksContainer = () => {
  const { links } = data;
  return (
    <ul className=" flex flex-col gap-4 w-full ">
      {links.map((link, index) => (
        <LinkCard key={index} label={link.title} url={link.url} />
      ))}
    </ul>
  );
};

export default LinksContainer;
