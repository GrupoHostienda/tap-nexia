import { RiDragMove2Fill, RiCloseFill } from "react-icons/ri";
import Draggable from "react-draggable";
import "react-resizable/css/styles.css";

const Iframe = () => {
  const videoId = "hYT6ZLS5Xro"; // el ID del tu video
  return (
    <Draggable handle=".handle">
      <div>
        <div className=" fixed  right-1/2 sm:right-0 lg:right-[-100px] translate-x-1/2 sm:translate-x-0 -bottom-[50px] w-[324px] h-[216px] sm:w-[405px] sm:h-[270px]">
          <iframe
            id="player"
            type="text/html"
            title="video"
            style={{ width: "100%", height: "100%" }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            src={`https://www.youtube.com/embed/${videoId}`} // Usa el ID del video aquí
          ></iframe>

          <div className="close flex items-center justify-center">
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
