/* eslint-disable react/prop-types */
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

export default function Location({ stats = [] }) {
  const cityCount = stats.reduce((acc, item) => {
    const city = item.city || "Unknown";
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  const cities = Object.entries(cityCount)
    .map(([city, count]) => ({ name: city, value: count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // top 5 cities

  return (
    <div style={{ width: "100%", height: 300 }}>
      {cities.length ? (
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={cities}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label
            >
              {cities.map((entry, index) => (
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
      ) : (
        <p className="text-gray-500 italic">No location data to display.</p>
      )}
    </div>
  );
}
