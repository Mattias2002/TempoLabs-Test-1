import React from "react";
import { Card } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface BudgetChartProps {
  data?: ChartData[];
}

const defaultData: ChartData[] = [
  { name: "Income", value: 5000, color: "#22c55e" },
  { name: "Expenses", value: 2000, color: "#ef4444" },
  { name: "Bills", value: 1500, color: "#3b82f6" },
  { name: "Savings", value: 1000, color: "#a855f7" },
  { name: "Debt", value: 500, color: "#f97316" },
];

const BudgetChart: React.FC<BudgetChartProps> = ({ data = defaultData }) => {
  return (
    <Card className="p-6 bg-white w-full h-[500px]">
      <h3 className="text-lg font-semibold mb-4">Budget Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BudgetChart;
