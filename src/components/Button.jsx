import { BsThreeDots } from "react-icons/bs";

function Button({ text }) {
  return (
    <button className="items-center justify-center flex gap-3 p-3 bg-transparent border-4 font-bold border-solid border-blue-900 rounded-md hover:bg-blue-900 hover:text-white transition-all">
      <p className="">{text}</p>
      <div className="absolute right-1/4 rounded-full hover:bg-blue-950 p-2 transition-all">
        <BsThreeDots></BsThreeDots>
      </div>
    </button>
  );
}

export default Button;
