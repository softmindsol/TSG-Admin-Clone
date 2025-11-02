import React from "react";
import CustomHeading from "../Common/CustomHeading";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const TotalAgentPerformance = () => {
  const options = {
    chart: {
      type: "areaspline",
      backgroundColor: "transparent",
    },
    title: {
      text: null, // Hide title
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      title: {
        text: "Time",
        style: { fontWeight: "bold" },
      },
    },
    yAxis: {
      title: {
        text: "Revenue",
        style: { fontWeight: "bold" },
      },
      labels: {
        formatter: function () {
          return "£" + this.value / 1000 + "k"; // format as £xxk
        },
      },
    },
    legend: {
      enabled: false, // hide legend
    },
    tooltip: {
      pointFormat: "Revenue: <b>£{point.y:,.0f}</b>",
    },
    plotOptions: {
      areaspline: {
        color: "#1f2937", // Tailwind gray-800 line
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "rgba(31,41,55,0.8)"], // dark gray top
            [1, "rgba(31,41,55,0)"], // transparent bottom
          ],
        },
        marker: {
          enabled: false,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },
    series: [
      {
        name: "Revenue",
        data: [
          10000, 12000, 30000, 8000, 45000, 55000, 50000, 35000, 30000, 20000,
          65000, 70000,
        ],
        color: "#1f2937", // Tailwind gray-800
      },
    ],
    credits: {
      enabled: false,
    },
  };
  return (
    <>
      <div className="flex justify-between items-center ">
        <CustomHeading heading="Total Agent Performance Snapshot" />
      </div>
      <div className="w-full bg-white mt-5 dark:bg-gray-900 p-6 rounded-xl shadow">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
};

export default TotalAgentPerformance;
