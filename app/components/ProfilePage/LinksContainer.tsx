import { Fragment } from "react/jsx-runtime";
import LinkCard from "./LinkCard";
import { PreviewProps, UserType } from "@/types";

type LinkContainerProps = {
  setIframeVisible: React.Dispatch<React.SetStateAction<boolean>>;
  iFrameVisible: boolean;
  data: PreviewProps[];
  user: UserType
};

const LinksContainer = ({
  setIframeVisible,
  iFrameVisible,
  data,
  user
}: LinkContainerProps) => {
  return (
    <ul className=" flex flex-col gap-4 w-full ">
      {data.map((link, index) => (
        <Fragment key={index}>
          <LinkCard
            label={link.title}
            url={link.url}
            setIframeVisible={setIframeVisible}
            iFrameVisible={iFrameVisible}
            style={link.style?.class}
          />
        </Fragment>
      ))}
    </ul>
  );
};

export default LinksContainer;
