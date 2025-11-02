import React from "react";
import CustomHeading from "../Common/CustomHeading";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Icons from "../../assets/icons/Icons";
const PaymentOverview = () => {
  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
    },
    legend: {
      align: "left",
      verticalAlign: "top",
      symbolRadius: 50, // circular bullets
      itemStyle: {
        fontWeight: "500",
        color: "#374151", // Tailwind gray-700
      },
    },
    tooltip: {
      shared: true,
      valuePrefix: "£",
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        borderRadius: 3, // smooth rounded bars
        grouping: true,
      },
    },
    series: [
      {
        name: "This Year",
        data: [160, 190, 150, 210, 180, 260, 290, 220],
        color: "#111827", // Tailwind gray-900
      },
      {
        name: "Last Year",
        data: [150, 170, 190, 200, 210, 180, 260, 280],
        color: "#d1d5db", // Tailwind gray-300
      },
    ],
    credits: {
      enabled: false,
    },
  };
  return (
    <>
      <CustomHeading heading="Payment Overview" textAlign="text-left" />

      <div className="bg-white p-6 rounded-lg shadow-md  mt-4">
        <HighchartsReact highcharts={Highcharts} options={options} />
        <div className="mt-4 flex justify-between font-poppins items-center">
          <span className="text-gray-500 font-medium">
            Total Collected This Month
          </span>
          <span className="text-lg font-bold">£12,450</span>
        </div>
       
      </div>
    </>
  );
};

export default PaymentOverview;
