"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Download,
  BarChart,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { exportCsv } from "@/lib/file";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const initialData = [
  { name: "Jan", users: 4000, revenue: 2400, expenses: 2000 },
  { name: "Feb", users: 3000, revenue: 1398, expenses: 1800 },
  { name: "Mar", users: 2000, revenue: 9800, expenses: 2200 },
  { name: "Apr", users: 2780, revenue: 3908, expenses: 2500 },
  { name: "May", users: 1890, revenue: 4800, expenses: 2300 },
  { name: "Jun", users: 2390, revenue: 3800, expenses: 2400 },
];

const pieData = [
  { name: "Product A", value: 400 },
  { name: "Product B", value: 300 },
  { name: "Product C", value: 300 },
  { name: "Product D", value: 200 },
  { name: "Product E", value: 100 },
];

type ChartType = "line" | "bar" | "pie";

export default function Home() {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [chartTypes, setChartTypes] = useState<ChartType[]>([
    "line",
    "bar",
    "pie",
  ]);

  const updateData = () => {
    setLoading(true);
    setTimeout(() => {
      const newData = data.map((item) => ({
        ...item,
        users: item.users + Math.floor(Math.random() * 1000 - 500),
        revenue: item.revenue + Math.floor(Math.random() * 1000 - 500),
        expenses: item.expenses + Math.floor(Math.random() * 500 - 250),
      }));
      setData(newData);
      setLoading(false);
    }, 1000);
  };

  const renderChart = (chartType: ChartType) => {
    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#8884d8"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#82ca9d"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#ffc658"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#8884d8" />
              <Bar dataKey="revenue" fill="#82ca9d" />
              <Bar dataKey="expenses" fill="#ffc658" />
            </RechartsBarChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
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
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex space-x-2">
          <Button onClick={updateData} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Data"
            )}
          </Button>
          <Button onClick={() => exportCsv(data)} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chartTypes.map((chartType, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Chart {index + 1}</CardTitle>
              <Select
                value={chartType}
                onValueChange={(value: ChartType) => {
                  const newChartTypes = [...chartTypes];
                  newChartTypes[index] = value;
                  setChartTypes(newChartTypes);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select chart type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">
                    <LineChartIcon className="mr-2 h-4 w-4 inline-block" />
                    Line Chart
                  </SelectItem>
                  <SelectItem value="bar">
                    <BarChart className="mr-2 h-4 w-4 inline-block" />
                    Bar Chart
                  </SelectItem>
                  <SelectItem value="pie">
                    <PieChartIcon className="mr-2 h-4 w-4 inline-block" />
                    Pie Chart
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>{renderChart(chartType)}</CardContent>
          </Card>
        ))}
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Users</span>
                <span className="text-2xl font-bold">
                  {data.reduce((sum, item) => sum + item.users, 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Revenue</span>
                <span className="text-2xl font-bold">
                  $
                  {data
                    .reduce((sum, item) => sum + item.revenue, 0)
                    .toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Expenses</span>
                <span className="text-2xl font-bold">
                  $
                  {data
                    .reduce((sum, item) => sum + item.expenses, 0)
                    .toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Net Profit</span>
                <span className="text-2xl font-bold">
                  $
                  {(
                    data.reduce((sum, item) => sum + item.revenue, 0) -
                    data.reduce((sum, item) => sum + item.expenses, 0)
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
