import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import OrderBookChart from "./stockPage/OrderBookChart";
import { OrderBook } from "../utils/type";
import { useNavigate } from "react-router-dom";
import BitCoin from "../assets/bitcoin.avif";

function StockPage() {
  const { socket, userId } = useContext(UserContext);
  const [orderBook, setOrderBook] = useState<OrderBook | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      alert("Please login first");
      navigate("/add-user");
    }
  }, [userId, navigate]);

  useEffect(() => {
    const stockSymbol = "test_stock6";
    if (socket) {
      socket.send(JSON.stringify({ type: "subscribe", roomId: stockSymbol }));

      const handleMessage = (message: any) => {
        console.log("Received data from server:", message.data);
        const data = JSON.parse(message.data);
        setOrderBook(data);
      };

      socket.addEventListener("message", handleMessage);

      return () => {
        socket.send(
          JSON.stringify({ type: "unsubscribe", roomId: stockSymbol })
        );
        socket.removeEventListener("message", handleMessage);
      };
    }
  }, [socket]);

  return (
    <div className=" w-full flex items-center justify-center min-h-screen bg-[#F5F5F5]">
      <div className="w-auto  flex-grow bg-[#F5F5F5]  pt-[60px] lg:px-16">
        <div className="w-full flex py-8 items-center">
          <p
            className="text-xl font-semibold text-[#757575] hover:cursor-pointer"
            onClick={() => navigate("/events")}
          >
            Home{" "}
          </p>
          <p className="text-2xl font-semibold text-[#757575] px-2">
            {"  >  "}{" "}
          </p>
          <p className="text-xl font-semibold ">Event Details</p>
        </div>
        <div className="w-full flex items-center gap-4 p-4">
          <img src={BitCoin} alt="" />
          <h1 className="text-3xl font-bold">Title</h1>
        </div>
        <div className="w-full grid  gap-4">
          <OrderBookChart dataFromAPI={orderBook} />

          <div className="w-[300px] h-[400px] rounded-lg bg-white"></div>
        </div>
      </div>
    </div>
  );
}

export default StockPage;
