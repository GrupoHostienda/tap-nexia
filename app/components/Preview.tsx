import { BsThreeDotsVertical } from "react-icons/bs";

type PreviewProps = {
  url: string;
  title: string;
  styles: string;
};

function Preview({ data }: { data: PreviewProps[] }) {
  return (
    <div className="flex self-center bg-black rounded-2xl w-64 h-[28rem] p-3">
      <div className="w-full h-full bg-gradient-to-b from-blue-300 to-blue-500 rounded-2xl p-3 flex flex-col gap-4 justify-start overflow-y-scroll hidden-scrollbar">
        {/* Foto de perfil */}
        <div className="size-16 rounded-full bg-gray-700 self-center"></div>

        {/* Nombre de usuario y mensaje de biografia */}
        <div className="text-center">
          <h1 className="font-bold">USER123@email.com</h1>
          <p className="text-gray-500 text-sm">xdxdxd</p>
        </div>

        {/* Links en linea */}
        <div className="flex flex-col gap-3">
          {data.map((datos, index) => {
            return (
              <a
                href={datos.url}
                target="_black"
                className={`${
                  !datos.styles
                    ? "bg-white p-3 grid grid-cols-[80%_10%] gap-4 items-center text-sm rounded-xl shadow-md "
                    : ""
                } ${datos.styles}`}
                key={index}
              >
                <p>{datos.title}</p>
                <span>
                  <BsThreeDotsVertical />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Preview;
