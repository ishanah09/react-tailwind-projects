import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { ExpenseContext } from "../context/ExpenseContext";
import { useContext } from "react";

export default function ExpenseAnalytics() {
  
const COLORS = [
  "#8884d8",  
  "#82ca9d", 
  "#ffc658",  
  "#ff7f50",  
  "#00C49F",  
  "#FFBB28",  
  "#FF8042",  
];


  const { state, dispatch } = useContext(ExpenseContext);

  function getCategoryTotals(list) {
    const totals = {};

    list.forEach((item) => {
      const category = item.category;
      const amount = parseFloat(item.amount);
      if (!totals[category]) totals[category] = 0;
      totals[category] += amount;
    });

    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }

  const data = getCategoryTotals(state.expenseList);

  const renderCustomizedLabel = ({ value, percent }) => {
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div>
      <h2 className="text-purple-500 text-md sm:text-[22px] font-semibold py-5 px-4">
        Expense Analytics
      </h2>

      {state.expenseList.length === 0 ? (
        <div className="text-center text-gray-600 pt-10 px-4 pb-15">
          <p className="text-lg font-semibold">No data to show</p>
          <p className="text-sm mt-1">
            Add expenses to see category breakdown.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-xl mx-auto p-4">
          <h2 className="text-md sm:text-xl font-semibold text-center mb-4">
            Expense Breakdown by Category
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
