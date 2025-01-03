import {
  FaUser,
  FaUserCircle,
  FaInfoCircle,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import { PiCarSimpleFill } from "react-icons/pi";
import Link from "next/link";

export const NavLink = ({ href, icon, children }) => (
  <Link
    href={href}
    className="flex items-center text-gray-600 hover:text-primary-100 font-medium"
  >
    {icon && <span className="mr-2">{icon}</span>}
    {children}
  </Link>
);

{/* Navigation Links */}
export const PatienceNavlinks = () => (
  <nav className="hidden md:flex space-x-6">
    <NavLink href="/services">Solicitar servicio</NavLink>
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

{/* Mobile Menu */}
export const PatienceMobileMenu = () => (
  <nav className="flex flex-col space-y-4 p-4">
    <NavLink href="/" icon={<MdMedicalServices />}>
      Solicitar servicio
    </NavLink>
    <NavLink href="/profile" icon={<FaUserCircle />}>
      Mi perfil
    </NavLink>
    <NavLink href="/settings" icon={<FaCog />}>
      Configuraciones
    </NavLink>
    <NavLink href="/about" icon={<FaInfoCircle />}>
      Acerca de
    </NavLink>
    <NavLink href="/contact" icon={<FaEnvelope />}>
      Centro ayuda
    </NavLink>
    <Link
      href="/sign-in"
      className="flex items-center mt-16 bg-primary-200 text-gray-100 hover:text-primary-100 font-medium px-2 py-1 rounded-md"
    >
      <FaUser className="mr-2" /> Iniciar Sesión
    </Link>
  </nav>
);
export const DoctorMobileMenu = () => (
    <nav className="flex flex-col space-y-4 p-4">
        <hr className="-mt-4"/>
      <NavLink href="/dashboard/history-service" icon={<LuHistory />}>
        Historial
      </NavLink>
      <NavLink href="/dashboard/vehicle" icon={<PiCarSimpleFill  />}>
        Vehiculos
      </NavLink>
      <NavLink href="/profile" icon={<FaUserCircle />}>
        Mi perfil
      </NavLink>
      <NavLink href="/settings" icon={<FaCog />}>
        Configuraciones
      </NavLink>
      <NavLink href="/about" icon={<FaInfoCircle />}>
        Acerca de
      </NavLink>
      <NavLink href="/contact" icon={<FaEnvelope />}>
        Centro ayuda
      </NavLink>
      <Link
        href="/sign-in"
        className="flex items-center mt-16 bg-red-600 text-gray-100 hover:text-primary-100 font-medium px-2 py-1 rounded-md"
      >
        <FaSignOutAlt className="mr-2" /> Cerrar Sesión
      </Link>
    </nav>
  );

{/* Dropdown Menu */}
export const PatienceDropdownMenu = () => (
  <div className="py-2 px-4 space-y-1 flex-col">
    <NavLink href="/profile" icon={<FaUserCircle />}>
      Mi Perfil
    </NavLink>
    <NavLink href="/settings" icon={<FaCog />}>
      Configuraciones
    </NavLink>
    <NavLink href="/logout" icon={<FaSignOutAlt />}>
      Cerrar Sesión
    </NavLink>
  </div>
);

export const DoctorDropdownMenu = () => (
    <div className="py-2 px-4 space-y-1 flex-col">
      <NavLink href="/profile" icon={<FaUserCircle />}>
        Mi Perfil
      </NavLink>
      <NavLink href="/dashboard/vehicle" icon={<PiCarSimpleFill />}>
        Vehiculos
      </NavLink>
      <NavLink href="/settings" icon={<FaCog />}>
        Configuraciones
      </NavLink>
      <NavLink href="/logout" icon={<FaSignOutAlt />}>
        Cerrar Sesión
      </NavLink>
    </div>
  );
