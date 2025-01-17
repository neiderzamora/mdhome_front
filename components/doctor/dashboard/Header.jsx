import { useContext } from "react";
import { FaClock } from "react-icons/fa";
import { UserContext } from "@/context/UserContext";

const Header = ({ currentTime }) => {
    const { user } = useContext(UserContext);
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-primary-100">
        Bienvenido, {user?.first_name || "Doctor"} {user?.last_name || ""}
      </h1>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          <FaClock className="inline mr-2" /> Hora Actual: {currentTime}
        </h2>
      </div>
    </div>
  );
};

export default Header;
