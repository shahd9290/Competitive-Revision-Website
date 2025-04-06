"use client"
import { Bar, Line, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

// Common chart options
const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
}

// Line Chart Component
export function LineChart({ data, labels, label = "Data", borderColor = "#0ea5e9", className = "" }) {
  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        borderColor,
        backgroundColor: "rgba(14, 165, 233, 0.1)",
        tension: 0.3,
      },
    ],
  }

  return <Line data={chartData} options={defaultOptions} className={className} />
}

// Bar Chart Component
export function BarChart({
  data,
  index,
  categories,
  colors = ["#0ea5e9"],
  valueFormatter = (value) => `${value}`,
  layout = "horizontal",
  className = "",
}) {
  const labels = data.map((item) => item[index])
  const datasets = categories.map((category, i) => ({
    label: category,
    data: data.map((item) => item[category]),
    backgroundColor: colors[i % colors.length],
    borderRadius: 4,
  }))

  const options = {
    ...defaultOptions,
    indexAxis: layout === "vertical" ? "y" : "x",
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      ...defaultOptions.plugins,
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              label += valueFormatter(layout === "vertical" ? context.parsed.x : context.parsed.y)
            }
            return label
          },
        },
      },
    },
  }

  const chartData = {
    labels,
    datasets,
  }

  return <Bar data={chartData} options={options} className={className} />
}

// Pie Chart Component
export function PieChart({
  data,
  index,
  category,
  colors = ["#0ea5e9", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#6366f1", "#ec4899", "#14b8a6"],
  valueFormatter = (value) => `${value}`,
  className = "",
}) {
  const labels = data.map((item) => item[index])
  const values = data.map((item) => item[category])

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors.slice(0, data.length),
        borderWidth: 1,
        borderColor: "#fff",
      },
    ],
  }

  const options = {
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || ""
            const value = context.raw || 0
            return `${label}: ${valueFormatter(value)}`
          },
        },
      },
    },
  }

  return <Pie data={chartData} options={options} className={className} />
}

