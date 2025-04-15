import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: ["Design", "Development", "Marketing"],
    datasets: [
      {
        label: "Department Workload",
        data: [40, 30, 30],
        backgroundColor: ["#6466f1", "#f97316", "#10b981"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 12,
          },
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
          padding: 15,
        },
      },
      title: {
        display: true,
        text: "Weekly Orders",
        align: "start",
        font: {
          family: "'Poppins', sans-serif",
          size: 16,
          weight: "600",
        },
        color: "#000000",
      },
    },
  };

  return (
    <div style={{ maxWidth: 300, margin: "0 auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
