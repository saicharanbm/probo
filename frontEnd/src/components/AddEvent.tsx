import { useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function AddEvent() {
  const stockSymbol = useRef<HTMLInputElement>(null);
  const stockDetail = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const endTime = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>();
  // const [response, setRespanse] = useState<string>();
  const { userId } = useContext(UserContext);
  useEffect(() => {
    if (!userId) {
      navigate("/add-user");
    }
  }, [userId, navigate]);

  const handleSubmit = () => {
    const stock = stockSymbol.current?.value.trim();
    const description = stockDetail.current?.value.trim();
    const time = endTime.current?.value;
    if (!(stock && description && time)) {
      setError("Please Provide all the fields");
      return;
    }
    setError("");

    const [hour, minute] = time.split(":");
    const currentTime = new Date();
    const day = currentTime.getDate();
    const month = currentTime.getMonth() + 1;
    const endTimeString = `${minute} ${hour} ${day} ${month} *`;

    fetch(`http://localhost:3000/symbol/create/${stock}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, description, endTime: endTimeString }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          setError(data.error);
        } else {
          alert(data.message);
          navigate("/events");
        }
      });
  };

  return (
    <div className="w-full flex-grow bg-[#99D7FA] px-6 flex items-center justify-center">
      <form className="bg-white px-6 py-9 rounded-lg  w-[700px] flex flex-col justify-evenly shadow-2xl gap-3">
        <div className="stock-symbol flex flex-col gap-2">
          <label className="text-3xl" htmlFor="stockSymbol">
            Stock Symbol :
          </label>
          <input
            id="stockSymbol"
            type="text"
            ref={stockSymbol}
            className="bg-white w-full px-4 py-2 rounded-lg border-2 border-gray-300"
          />
        </div>
        <div className="stock_details flex flex-col gap-2">
          <label className="text-3xl" htmlFor="details">
            Details:
          </label>
          <textarea
            id="details"
            rows={4}
            ref={stockDetail}
            className="bg-white w-full px-4 py-2 rounded-lg border-2 border-gray-300"
          />
        </div>
        <div className="end_time flex flex-col gap-2">
          <label className="text-3xl" htmlFor="stockSymbol">
            End Time:
          </label>
          <input
            id="stockSymbol"
            type="time"
            ref={endTime}
            className="bg-white w-full px-4 py-2 rounded-lg border-2 border-gray-300"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {/* {response && <p className="text-green-500">{response}</p>} */}
        <div className="create_event w-full flex justify-center">
          <button
            type="submit"
            className="bg-black text-white text-3xl px-4 py-2 rounded-lg align-middle w-[350px]"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEvent;
