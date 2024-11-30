import { useNavigate } from "react-router-dom";
function StockEvent({
  owner,
  description,
  createdAt,
  endTime,
  isActive,
  stockSymbol,
}: {
  owner: string;
  description: string;
  createdAt: string;
  endTime: string;
  isActive: boolean;
  stockSymbol: string;
}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/event/${stockSymbol}`);
      }}
      className="border border-gray-300 rounded-lg p-4 m-4 bg-white shadow-md transition-transform transform hover:scale-105 cursor-pointer"
    >
      <h1 className="text-lg font-bold text-gray-800">{stockSymbol}</h1>
      <h2 className="text-md text-gray-600">{description}</h2>
      <p className="text-sm text-gray-500">Owner: {owner}</p>
      <p className="text-sm text-gray-500">Created At: {createdAt}</p>
      <p className="text-sm text-gray-500">End Time: {endTime}</p>
      <p
        className={`text-sm font-semibold ${
          isActive ? "text-green-500" : "text-red-500"
        }`}
      >
        Status: {isActive ? "Active" : "Inactive"}
      </p>
    </div>
  );
}

export default StockEvent;
