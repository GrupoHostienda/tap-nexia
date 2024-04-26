import { FaBusinessTime, FaPalette, FaRegStar, FaRegEdit, FaBalanceScale } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { GoVideo } from "react-icons/go";
import { TbPerfume, TbPizza,TbHealthRecognition } from "react-icons/tb";
import { PiFlagBannerBold, PiAirplaneTiltBold } from "react-icons/pi";
import { LuLayoutGrid } from "react-icons/lu";

// Define una interfaz para representar un icono
interface Icono {
  nombre: string;
  componente: React.ReactElement;
}

// Lista de iconos disponibles
const iconos: Icono[] = [
  { nombre: "business", componente: <FaBusinessTime/> },
  { nombre: "palette", componente: <FaPalette/> },
  { nombre: "star", componente: <FaRegStar/> },
  { nombre: "edit", componente: <FaRegEdit/> },
  { nombre: "video", componente: <GoVideo/> },
  { nombre: "perfume", componente: <TbPerfume/> },
  { nombre: "food", componente: <TbPizza/> },
  { nombre: "balance", componente: <FaBalanceScale/> },
  { nombre: "health", componente: <TbHealthRecognition/> },
  { nombre: "banner", componente: <PiFlagBannerBold/> },
  { nombre: "layout", componente: <LuLayoutGrid/> },
  { nombre: "computer", componente: <FaComputer/> },
  { nombre: "airplane", componente: <PiAirplaneTiltBold/> }
];



const SelectorIcono = ({ nombreIcono }:{nombreIcono:string}) => {
  const iconoEncontrado = iconos.find(icono => icono.nombre === nombreIcono);
    return <>{iconoEncontrado?.componente}</>; // No es necesario renderizar nada en este componente
  };

export default SelectorIcono;
