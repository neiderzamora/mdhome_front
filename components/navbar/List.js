import {
  FaUser,
  FaUserCircle,
  FaInfoCircle,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { HiBellAlert } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";
import { MdMedicalServices, MdDashboard, MdTaxiAlert } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import { PiCarSimpleFill } from "react-icons/pi";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export const NavLink = ({ href, icon, children }) => (
  <Link
    href={href}
    className="flex items-center text-gray-600 hover:text-primary-100 font-medium"
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
  </Link>
);

{
  /* Navigation Links */
}
export const PatienceNavlinks = () => (
  <nav className="hidden md:flex space-x-6">
    <NavLink href="/request-service">Solicitar servicio</NavLink>
    <NavLink href="/about">Acerca de</NavLink>
    <NavLink href="/contact">Centro ayuda</NavLink>
  </nav>
);

export const DoctorNavlinks = () => (
  <nav className="hidden md:flex space-x-6">
    <NavLink href="/dashboard/history-service">Historial</NavLink>
    <NavLink href="/about">Acerca de</NavLink>
    <NavLink href="/contact">Centro ayuda</NavLink>
  </nav>
);

{
  /* Mobile Menu */
}
export const PatienceMobileMenu = () => {
  const { logout } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/sign-in");
  };
  return (
    <nav className="flex flex-col space-y-4 p-4">
      <NavLink href="/" icon={<MdMedicalServices />}>
        Solicitar servicio
      </NavLink>
      <NavLink href="/profile" icon={<FaUserCircle />}>
        Mi perfil
      </NavLink>
      <NavLink href="/addresses" icon={<FaLocationDot />}>
        Direcciones
      </NavLink>
      <NavLink href="/service-progress" icon={<HiBellAlert />}>
        Mi servicio
      </NavLink>
      <NavLink href="/about" icon={<FaInfoCircle />}>
        Acerca de
      </NavLink>
      <NavLink href="/contact" icon={<FaEnvelope />}>
        Centro ayuda
      </NavLink>
      <button
        onClick={handleLogout}
        className="flex items-center mt-16 bg-primary-200 text-gray-100 hover:opacity-80 font-medium px-2 py-1 rounded-md"
      >
        <FaSignOutAlt className="mr-2" /> Cerrar Sesión
      </button>
    </nav>
  );
};

export const DoctorMobileMenu = () => {
  const { logout } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/sign-in");
  };
  return (
    <nav className="flex flex-col space-y-4 p-4">
      <hr className="-mt-4" />
      <NavLink href="/dashboard" icon={<MdDashboard />}>
        Dashboard
      </NavLink>
      <NavLink href="/profile" icon={<FaUserCircle />}>
        Mi perfil
      </NavLink>
      <NavLink href="/dashboard/history-service" icon={<LuHistory />}>
        Historial
      </NavLink>
      <NavLink href="/dashboard/vehicle" icon={<PiCarSimpleFill />}>
        Vehiculos
      </NavLink>
      <NavLink href="/about" icon={<FaInfoCircle />}>
        Acerca de
      </NavLink>
      <NavLink href="/contact" icon={<FaEnvelope />}>
        Centro ayuda
      </NavLink>
      <button
        onClick={handleLogout}
        className="flex items-center mt-16 bg-primary-200 text-gray-100 hover:opacity-80 font-medium px-2 py-1 rounded-md"
      >
        <FaSignOutAlt className="mr-2" /> Cerrar Sesión
      </button>
    </nav>
  );
};

{
  /* Dropdown Menu */
}
export const PatienceDropdownMenu = () => {
  const { logout } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/sign-in");
  };
  return (
    <div className="py-2 px-4 space-y-1 flex-col">
      <NavLink href="/profile" icon={<FaUserCircle />}>
        Mi Perfil
      </NavLink>
      <NavLink href="/addresses" icon={<FaLocationDot />}>
        Direcciones
      </NavLink>
      <NavLink href="/service-progress" icon={<HiBellAlert />}>
        Mi servicio
      </NavLink>
      <button
        onClick={handleLogout}
        className="flex items-center text-gray-600 hover:text-primary-100 font-medium"
      >
        <FaSignOutAlt className="mr-2 ml-0.5" /> Cerrar Sesión
      </button>
    </div>
  );
};

export const DoctorDropdownMenu = () => {
  const { logout } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/sign-in");
  };

  return (
    <div className="py-2 px-4 space-y-1 flex-col">
      <NavLink href="/profile" icon={<FaUserCircle />}>
        Mi Perfil
      </NavLink>
      <NavLink href="/dashboard" icon={<MdDashboard />}>
        Dashboard
      </NavLink>
      <NavLink href="/dashboard/vehicle" icon={<PiCarSimpleFill />}>
        Vehiculos
      </NavLink>
      <button
        onClick={handleLogout}
        className="flex items-center text-gray-600 hover:text-primary-100 font-medium"
      >
        <FaSignOutAlt className="mr-2 ml-0.5" /> Cerrar Sesión
      </button>
    </div>
  );
};
