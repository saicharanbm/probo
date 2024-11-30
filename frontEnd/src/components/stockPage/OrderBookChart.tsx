import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { OrderBook } from "../../utils/type";

const dummyData = [
  { price: 0, total: 0 },
  { price: 0, total: 0 },
  { price: 0, total: 0 },
  { price: 0, total: 0 },
  { price: 0, total: 0 },
];
function OrderBookChart({ dataFromAPI }: { dataFromAPI: OrderBook | null }) {
  console.log("graph component:", dataFromAPI);

  return (
    <div className="w-full max-w-[800px] bg-stone-400 rounded-xl h-[420px] border-2 border-gray-300   px-4 py-4 flex flex-col justify-between ">
      <h3 className="text-2xl font-bold  underline">Order Book</h3>
      <div className="flex space-x-4 bg-[#F5F5F5] border-2 border-gray-300 rounded-lg p-2">
        {/* Yes Orders Bar Chart */}
        <div className="flex-1 ">
          <div className="flex justify-between px-4">
            <p className="text-md font-bold">Price</p>
            <p className="text-md font-semibold font-sans">
              Qty at <span className="text-red-600">Yes</span>
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={dataFromAPI?.yes ? dataFromAPI.yes : dummyData}
              layout="vertical"
              margin={{
                top: 10,
                right: 30,
                bottom: 5,
              }}
            >
              <XAxis
                type="number"
                axisLine={false}
                tick={false}
                reversed
                domain={[0, "dataMax + 3"]}
              />
              <YAxis type="category" dataKey="price" interval={0} />
              <Bar dataKey="total" fill="#BBD8FF" barSize={30}>
                <LabelList dataKey="total" position="insideLeft" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* No Orders Bar Chart */}
        <div className="flex-1">
          <div className="flex justify-between px-4">
            <p className="text-sm font-bold">Price</p>
            <p className="text-sm font-semibold ">
              Qty at <span className="text-blue-500">No</span>
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={dataFromAPI?.no ? dataFromAPI.yes : dummyData} // Default to empty data if 'no' orders are zeroed
              layout="vertical"
              margin={{
                top: 10,
                right: 30,
                bottom: 0,
              }}
            >
              <XAxis
                type="number"
                axisLine={false}
                tick={false}
                reversed
                domain={[0, "dataMax + 3"]}
              />
              <YAxis type="category" dataKey="price" interval={0} />
              <Bar dataKey="total" fill="#FFDCDB" barSize={30}>
                <LabelList dataKey="total" position="insideLeft" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default OrderBookChart;
