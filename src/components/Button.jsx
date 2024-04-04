import { BsThreeDots } from "react-icons/bs";

function Button({ text, toggleBar }) {
  const toggle = () => {
    toggleBar();
  };

  return (
    <button className="items-center grid grid-cols-3 gap-3 p-3 bg-transparent border-4 font-bold max-w-72 min-w-60 mx-auto border-solid border-blue-900 rounded-md hover:bg-blue-900 hover:text-white transition-all">
      <p className="col-span-2">{text}</p>
      <div>
        <button
          className="rounded-full hover:bg-blue-950 p-2 transition-all cursor-pointer"
          onClick={toggle}
        >
          <BsThreeDots></BsThreeDots>
        </button>
      </div>
    </button>
  );
}

export default Button;
