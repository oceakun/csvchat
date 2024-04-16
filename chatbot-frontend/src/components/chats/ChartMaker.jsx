import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
} from "recharts";

function ChartMaker({ file, columnNames, chartType }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (file && columnNames && chartType) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target.result;
        const parsedData = parseCSV(csvData);

        // Extract data based on column names
        const data = extractData(parsedData, columnNames);

        // Set chart data
        setChartData(data);
      };

      // Read the contents of the file as text
      reader.readAsText(file);
    }
  }, [file, columnNames, chartType]);

  const parseCSV = (csvData) => {
    // Implement CSV parsing logic here
    return csvData;
  };

  const extractData = (parsedData, columnNames) => {
    return [
      { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
      { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
      { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
      { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
      { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
      { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
      { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
    ]; // Example data, replace with your data
  };

  // Render chart based on chart type
  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <LineChart width={500} height={300} data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
          </LineChart>
        );
      case "bar":
        return (
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="uv" fill="#8884d8" />
            <Bar dataKey="pv" fill="#82ca9d" />
          </BarChart>
        );
      case "pie":
        return (
          <PieChart width={500} height={300}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return <div>{renderChart()}</div>;
}

export default ChartMaker;
