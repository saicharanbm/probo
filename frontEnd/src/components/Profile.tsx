import { useState, useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function Profile() {
  const [isHovered, setIsHovered] = useState(false);
  const { userId, setUserId } = useContext(UserContext);
  const hoverTimeout = useRef<number>();

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setIsHovered(false), 1000);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-10 h-10 bg-grey rounded-full cursor-pointer">
        <img
          className="w-full rounded-full"
          src="https://probo.in/_next/image?url=https%3A%2F%2Fprobo.gumlet.io%2Fimage%2Fupload%2Fprobo_product_images%2FSilhouette.png&w=48&q=75"
          alt="profile image"
        />
      </div>

      {/* Floating window */}
      {isHovered && (
        <div
          className="absolute right-1 mt-1 w-48 bg-white shadow-lg rounded-lg z-10 flex flex-col overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center justify-center bg-slate-300 p-2">
            <p className="font-bold">{userId}</p>
          </div>
          <div className="flex flex-col gap-2 p-2">
            <Link
              to={"/events"}
              className="text-sm text-gray-500 w-full text-center hover:scale-110 hover:font-bold"
            >
              Events
            </Link>
            <Link
              to={"/add-money"}
              className="text-sm text-gray-500 w-full text-center hover:scale-110 hover:font-bold"
            >
              Add Money
            </Link>
            <Link
              onClick={() => {
                setUserId("");
              }}
              to={"/add-money"}
              className="text-sm text-gray-500 w-full text-center hover:scale-110 hover:font-bold"
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
