import { NavLink } from "react-router-dom";
import Profile from "./Profile";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

function Navbar() {
  const { userId } = useContext(UserContext);
  return (
    <div className="w-full bg-[#F5F5F5] p-2 px-6 flex justify-between items-center border-b-2 border-gray-300 border-spacing-3 fixed top-0 left-0 z-50">
      <h1 className="text-3xl font-bold">
        <NavLink to="/">Probo</NavLink>
      </h1>
      <div className="flex gap-4 items-center">
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `font-sans font-bold ${isActive ? "text-gray-500" : "text-black"}`
          }
        >
          Events
        </NavLink>
        {userId && (
          <NavLink
            to="/add-event"
            className={({ isActive }) =>
              `font-sans font-bold ${isActive ? "text-gray-500" : "text-black"}`
            }
          >
            Add_Event
          </NavLink>
        )}
      </div>
      {userId ? (
        <Profile />
      ) : (
        <NavLink to="/add-user" className="text-xl font-bold">
          Login
        </NavLink>
      )}
    </div>
  );
}

export default Navbar;
