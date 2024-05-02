import { Fragment } from "react/jsx-runtime";
import LinkCard from "./LinkCard";
import data from "data.json";

type LinkContainerProps = {
  setIframeVisible: React.Dispatch<React.SetStateAction<boolean>>;
  iFrameVisible: boolean;
};

const LinksContainer = ({
  setIframeVisible,
  iFrameVisible,
}: LinkContainerProps) => {
  const { links } = data;
  return (
    <ul className=" flex flex-col gap-4 w-full ">
      {links.map((link, index) => (
        <Fragment key={index}>
          <LinkCard
            label={link.title}
            url={link.url}
            setIframeVisible={setIframeVisible}
            iFrameVisible={iFrameVisible}
          />
        </Fragment>
      ))}
    </ul>
  );
};

export default LinksContainer;
