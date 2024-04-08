/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { RiDragMove2Fill, RiCloseFill } from "react-icons/ri";
import Draggable from "react-draggable";
import "react-resizable/css/styles.css";
import { useRef } from "react";

type IframeProps = {
  setIframeVisible: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
};

const Iframe = ({ setIframeVisible, url }: IframeProps) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  return (
    <Draggable handle=".handle">
      <div>
        <div className=" absolute right-1/2 sm:right-0 lg:right-[-100px] translate-x-1/2 sm:translate-x-0 -bottom-[50px] w-[324px] h-[216px] sm:w-[405px] sm:h-[270px]">
          <iframe
            ref={iframeRef}
            id="player"
            title="video"
            style={{ width: "100%", height: "100%" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            src={url}
          ></iframe>

          <div
            onClick={() => setIframeVisible(false)}
            className="close flex items-center justify-center"
          >
            <RiCloseFill className=" hover:scale-125 transition-all" />
          </div>
          <div className="handle flex items-center justify-center">
            <RiDragMove2Fill className=" hover:scale-125 transition-all" />
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Iframe;
