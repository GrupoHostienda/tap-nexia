import { Form, Link } from "@remix-run/react";
import { CiLogout } from "react-icons/ci";
import { HiPaintBrush } from "react-icons/hi2";
import { MdOutlineDashboard } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";

const DashboarHeader = () => {
  const linkStyle =
    " py-1 px-2 text-gray-600 bg-gray-200 hover:scale-105 transition-all rounded-full flex justify-center items-center gap-2 ";

  return (
    <>
      <div className=" hidden sm:block fixed z-20 top-4 left-1/2 -translate-x-1/2 bg-white bg-opacity-80 border border-white border-opacity-40 rounded-full shadow-lg shadow-black/[0.05] backdrop-blur-[0.5rem] max-w-[800px] w-[95%] h-10"></div>
      <ul className=" hidden sticky z-20 top-3  sm:grid sm:grid-cols-4 gap-4 py-2 max-w-[700px] w-[85%] mx-auto">
        <li>
          <Link className={linkStyle} to="/preview">
            <VscOpenPreview /> Preview
          </Link>
        </li>
        <li>
          <Link className={linkStyle} to="/back-office">
            <MdOutlineDashboard /> Back Office
          </Link>
        </li>
        <li>
          <Link className={linkStyle} to="/styles">
            <HiPaintBrush /> Styles
          </Link>
        </li>
        <li>
          <Form className={linkStyle} action="/logout" method="post">
            <button className=" flex items-center gap-2">
              <CiLogout /> Log out
            </button>
          </Form>
        </li>
      </ul>
    </>
  );
};

export default DashboarHeader;
