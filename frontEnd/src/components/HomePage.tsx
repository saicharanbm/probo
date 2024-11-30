// import React from "react";
import { Link } from "react-router-dom";
import HeaderImage from "../assets/cricket_header.avif";

function HomePage() {
  return (
    <div className="w-full flex-grow bg-[#99D7FA]  px-6 flex ">
      <div className="absolute top-[27%] left-[10%] ">
        <h1 className="text-5xl font-bold text-black pb-6">
          Predict, Play & Win upto
        </h1>
        <h1 className="text-7xl font-bold text-black pb-14">10₹ Rupee*</h1>
        <div className="flex gap-2 w-full px-[25%]">
          <button className="bg-black text-white text-3xl  px-4 py-2 rounded-lg align-middle">
            <Link to="/add-user"> Get Started</Link>
          </button>
        </div>
      </div>
      <img
        className="absolute bottom-0 right-0 w-[63%] "
        src={HeaderImage}
        alt="cricket_header"
      />
    </div>
  );
}

export default HomePage;
