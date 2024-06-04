import {
  Form,
  Link,
  useLocation,
  useNavigation,
  useOutletContext,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { HiPaintBrush } from "react-icons/hi2";
import { IoIosMenu } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";
// import { sidebarSwitch, toggleSidebar } from "./layout/HeadingMobile";

// type OutletContextProps = {
//   state: { items: [], isSidebarOpen: boolean };
//   dispatch: React.Dispatch<React.SetStateAction<{}>>;
// };

const DashboarHeader = () => {
  const linkStyle =
    " py-1 px-2 text-gray-600 bg-gray-200 font-semibold hover:scale-105 transition-all rounded-full flex justify-center items-center gap-2 //shadow-sm //shadow-gray-600/[0.5]";
  const navigation = useNavigation();
  const isRouting = navigation.state !== "idle"; //para el spiner
  const submitMethod = navigation.formMethod; //para el spiner | cuando el submit viene del onclick en los links esta const es undefined, si viene del crud de /styles será POST
  const [pathname, setPathname] = useState(""); //Para el spiner
  const location = useLocation(); //para el spiner

  // const { state, dispatch } = useOutletContext<OutletContextProps>();
  // const [sidebarSwitch, toggleSidebar] = useState(state.isSidebarOpen)
  // const toggle = () => {
  //   toggleSidebar(!sidebarSwitch)
  //   dispatch({type: 'sidebarToggle', payload: sidebarSwitch});
  // }

  const useViewport = () => {
    const [width, setWidth] = useState<number | undefined>(
      typeof window !== "undefined" ? window.innerWidth : undefined
    );

    useEffect(() => {
      if (typeof window === "undefined") return;

      const handleResize = () => setWidth(window.innerWidth);

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { width };
  };

  //para el spiner
  useEffect(() => {
    setPathname("");
  }, [location.pathname]);

  const linksNavbar = (
    <>
      <li>
        <Link
          className={linkStyle}
          to="/preview"
          onClick={() => setPathname("/preview")}
        >
          <VscOpenPreview /> Preview
          {pathname === "/preview" &&
            submitMethod === undefined &&
            isRouting && (
              <div className=" animate-spin h-5 w-5 border-l-2 border-gray-600 rounded-full "></div>
            )}
        </Link>
      </li>
      <li>
        <Link
          className={linkStyle}
          to="/back-office"
          onClick={() => setPathname("/back-office")}
        >
          <MdOutlineDashboard /> Back Office
          {pathname === "/back-office" &&
            submitMethod === undefined &&
            isRouting && (
              <div className=" animate-spin h-5 w-5 border-l-2 border-gray-600 rounded-full"></div>
            )}
        </Link>
      </li>
      <li>
        <Link
          className={linkStyle}
          to="/styles"
          onClick={() => setPathname("/styles")}
        >
          <HiPaintBrush /> Styles
          {pathname === "/styles" &&
            submitMethod === undefined &&
            isRouting && (
              <div className=" animate-spin h-5 w-5 border-l-2 border-gray-600 rounded-full"></div>
            )}
        </Link>
      </li>
      <li>
        <Form className={linkStyle} action="/logout" method="post">
          <button
            className=" flex items-center gap-2"
            onClick={() => setPathname("/logout")}
          >
            <CiLogout /> Log out
            {pathname === "/logout" &&
              submitMethod === undefined &&
              isRouting && (
                <div className=" animate-spin h-5 w-5 border-l-2 border-gray-600 rounded-full"></div>
              )}
          </button>
        </Form>
      </li>
    </>
  );

  const [sidebarSwitch, toggle] = useState(false);
  const [sidebarButton, toggleButton] = useState(false);

  //FUNCION PARA OCULTAR EL SIDEBAR SI LA PANTALLA SOBREPASA CIERTO ANCHO
  const { width } = useViewport();
  useEffect(() => {
    if (width !== undefined && width > 650) {
      toggle(false); // Cambia el valor según el tamaño del viewport
      toggleButton(false);
    } else if (width !== undefined && width < 650) {
      toggleButton(true);
    }
  }, [width]);

  return (
    <>
      <div className=" hidden sm:block fixed z-20 top-4 left-1/2 -translate-x-1/2 bg-white bg-opacity-60 border border-white border-opacity-40 rounded-full shadow-lg shadow-black/[0.05] backdrop-blur-[0.5rem] max-w-[800px] w-[95%] h-10"></div>
      <IoIosMenu
        className={`${
          sidebarButton ? "block" : "hidden"
        } absolute z-30 right-6 top-6 size-10 cursor-pointer`}
        onClick={() => toggle(!sidebarSwitch)}
      />
      <ul
        className={`fixed ${
          sidebarSwitch ? "right-0" : "-right-full"
        } w-64 backdrop-blur-[0.5rem] bg-opacity-60 bg-white h-full z-30 grid grid-cols-1 grid-rows-[5%_5%_5%_5%_70%] items-end gap-4 p-3 transition-all`}
      >
        <button
          onClick={() => toggle(!sidebarSwitch)}
          className="text-gray-400 focus:outline-none focus:text-white self-start"
          aria-label="Close sidebar"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        {linksNavbar}
      </ul>
      <ul className=" hidden fixed z-20 top-3 left-1/2 -translate-x-1/2 sm:grid sm:grid-cols-4 gap-4 py-2 max-w-[700px] w-[85%] mx-auto">
        {linksNavbar}
      </ul>
    </>
  );
};

export default DashboarHeader;
