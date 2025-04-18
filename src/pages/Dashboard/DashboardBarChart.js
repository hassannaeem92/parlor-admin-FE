import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

export default function DashboardBarChart({ data }) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const salesData = data || [];

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const monthlyData = Array.from({ length: 12 }, () => ({
      total_sales: 0,
      total_pending: 0,
      total_proceed: 0,
      total_delivered: 0,
    }));

    salesData.forEach((item) => {
      const {
        sale_year,
        sale_month,
        total_sales,
        total_pending,
        total_proceed,
        total_delivered,
      } = item;
      const monthDiff =
        (currentYear - sale_year) * 12 + (currentMonth - sale_month);
      if (monthDiff >= 0 && monthDiff < 12) {
        monthlyData[11 - monthDiff] = {
          total_sales,
          total_pending,
          total_proceed,
          total_delivered,
        };
      }
    });

    const monthLabels = Array.from({ length: 12 }, (_, index) => {
      const date = new Date(currentYear, currentMonth - 1 - index);
      return date.toLocaleString("default", { month: "long" });
    }).reverse();

    const data = {
      labels: monthLabels,
      datasets: [
        {
          label: "Sales",
          backgroundColor: "#db2585",
          data: monthlyData.map((item) => item.total_sales),
        },
        {
          label: "Pending",
          backgroundColor: "rgb(168 85 247)",
          data: monthlyData.map((item) => Math.abs(item.total_pending)),
        },
        {
          label: "Proceed",
          backgroundColor: "#248afd",
          data: monthlyData.map((item) => item.total_proceed),
        },
        {
          label: "Delivered",
          backgroundColor: "rgb(34 197 94)",
          data: monthlyData.map((item) => item.total_delivered),
        },
      ],
    };

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            fontColor: "black",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "black",
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: "black",
          },
          grid: {
            color: "lightgrey",
            drawBorder: false,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="card">
      <Chart type="bar" data={chartData} options={chartOptions} />
    </div>
  );
}
