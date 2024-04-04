import { useState } from "react";
import Button from "./Button";
import TopDownBar from "./TopDownBar";
import { LuYoutube, LuInstagram } from "react-icons/lu";
function App() {
  const [toggle, setToggle] = useState(false);

  const toggleBar = () => {
    setToggle(!toggle);
  };
  return (
    <>
      {/* Foto de perfil y descripcion */}
      <div className="container z-10 bg-transparent h-screen p-7 text-blue-900 w-full mx-auto font-mono">
        <div className="p-7 grid grid-cols-1 gap-5 h-full">
          <div class="bg-transparent p-6">
            <div class="w-24 h-24 rounded-full overflow-hidden mx-auto">
              <img class="object-cover w-full h-full" src="images.png" alt="" />
            </div>
            <div className="justify-center text-center p-4">
              <h1 className="text-3xl font-bold">Lorem ipsum</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
          {/* botones */}
          <div className="btn-box z-10 grid grid-cols-1 gap-6 h-min">
            <Button toggleBar={toggleBar} text="Menu"></Button>
            <Button text="Online order"></Button>
            <Button text="Our story"></Button>
            <Button text="Locations"></Button>
          </div>
          {/* Redes sociales */}
          <div className="flex z-10 gap-4 items-center justify-center w-full text-xl mt-5">
            <div className="content-between p-2 absolute mr-9">
              <LuYoutube title="Youtube" className="hover:text-2xl"></LuYoutube>
            </div>
            <div className="content-between p-2 absolute ml-9">
              <LuInstagram
                title="Instagram"
                className="hover:text-2xl"
              ></LuInstagram>
            </div>
          </div>
        </div>
      </div>
      {/* barra oculta desplegable */}
      <TopDownBar toggle={toggle}></TopDownBar>
      <img src="croissant.svg" className="z-0 drop-shadow-2xl w-full opacity-70 justify-center mt-40 lg:mt-30 lg:size-[40%] mx-auto" alt="" />
    </>
  );
}

export default App;
