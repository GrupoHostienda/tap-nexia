import { BsThreeDots } from "react-icons/bs";


function Button(){
    return <button className='items-center justify-center flex gap-3 p-3 bg-transparent border-2 border-solid border-blue-900 rounded-md hover:bg-blue-900 hover:border-white hover:text-white transition-all'>
    <p className="">Lorem ipsum</p>
    <BsThreeDots className="absolute right-1/4"></BsThreeDots>
  </button>
}

export default Button