import Layout from "@/components/layout/layout";
import React, { useState, useEffect } from "react";
import { Blockquote } from "flowbite-react";

import dynamic from "next/dynamic";
import { getLocalToken } from "../../../enviroment/auth";
import axios from "axios";
import DashboardTab from "@/components/Dashboard/dashboard";
import ArtistLayout from "@/components/layout/artistLayout";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Dashboard = () => {
  const [saleOrderName, setSaleOrderName] = useState();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [currentMonth, setCurrentMonth] = useState(
    monthNames[new Date().getMonth()]
  );

  const [salesData, setSalesData] = useState({
    series: [
      {
        name: "Sales",
        data: [],
      },
    ],
    options: {
      xaxis: {
        type: "category",
        categories: [],
      },
    },
  });

  useEffect(() => {
    const getSales = async () => {
      try {
        const { data } = await axios.post(
          "http://admin.artabiasa.com/api/get-order-by-week",
          {
            api_password: process.env.REACT_APP_API_PASSWORD,
          },
          {
            headers: {
              Authorization: "Bearer " + getLocalToken(),
            },
          }
        );
        console.log("API Response =>", data);

        if (data.status === "true" || data.status === "false") {
          console.log(data);
          const daysOfWeek = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thersday",
            "Friday",
            "Satarday",
            "Sunday",
          ];
          console.log("sales of data", salesData);
          const newSalesData = daysOfWeek.map((day) =>
            parseFloat(data[day.toLowerCase()])
          );
          console.log(newSalesData);
          const countSalesData = daysOfWeek.map((day) =>
            parseFloat(data[`${day.toLowerCase()}_count_sales`])
          );

          setSalesData((prevData) => {
            const newSeries = [
              {
                name: "Sales",
                data: newSalesData,
              },
            ];
            const newOptions = {
              xaxis: {
                type: "category",
                categories: daysOfWeek,
              },
            };

            return {
              ...prevData,
              series: newSeries,
              options: newOptions,
            };
          });
          setSaleOrderName("Weekly");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getSales();
  }, []);

  const [chartType, setChartType] = useState("Weekly");

  const handleMonth = async (month_id) => {
    const month = month_id + 1;
    console.log(month);

    try {
      const { data } = await axios.post(
        "http://admin.artabiasa.com/api/get-order-by-month",
        {
          month: month,
          api_password: process.env.REACT_APP_API_PASSWORD,
        },
        {
          headers: {
            Authorization: "Bearer " + getLocalToken(),
          },
        }
      );
      console.log("API Response =>", data);

      if (data.status === "true" || data.status === "false") {
        console.log(data);

        // Extracting data from the response
        const monthlySum = parseFloat(data.order_sum_month);
        const dailySums = data.OrderSumOfDays.map((daySum) =>
          parseFloat(daySum)
        );

        // Update chart data
        setSalesData((prevData) => {
          const newSeries = [
            {
              name: "Monthly Sum",
              data: [monthlySum],
            },
            {
              name: "Daily Sums",
              data: dailySums,
            },
          ];
          const newOptions = {
            xaxis: {
              type: "category",
              categories: ["Monthly Sum"],
            },
          };

          setChartType("month");

          return {
            ...prevData,
            series: newSeries,
            options: newOptions,
          };
        });
        setSaleOrderName("Monthly and Daily Sums");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleButtonClick = async (type) => {
    try {
      const { data } = await axios.post(
        "http://admin.artabiasa.com/api/get-order-by-year",
        {
          year: 2024,
          api_password: process.env.REACT_APP_API_PASSWORD,
        },
        {
          headers: {
            Authorization: "Bearer " + getLocalToken(),
          },
        }
      );

      console.log("API Response =>", data);

      if (data.status === "true" || data.status === "false") {
        console.log(data);
        const yearlySum = data.OrderSumOfYear.map((monthSum) =>
          parseFloat(monthSum)
        );
        setSalesData((prevData) => {
          const newSeries = [
            {
              name: "Yearly Sum",
              data: yearlySum,
            },
          ];

          const newOptions = {
            xaxis: {
              type: "category",
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
            },
          };

          setChartType(type);

          return {
            ...prevData,
            series: newSeries,
            options: newOptions,
          };
        });

        setSaleOrderName("Yearly Sum");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <ArtistLayout>
      <div className="grid grid-cols-12  py-5">
        <div className="col-span-12  lg:col-span-12 lg:mx-32 flex flex-col   justify-center">
          <p className="font-bold text-center text-[#BE55A9] text-2xl lg:mt-20 lg:mb-0 mt-10 mb-10">
            Your Sales for this {saleOrderName}
          </p>
          <div id="salesChart" className="lg:mx-10 lg:mt-10 mb-10">
            <ReactApexChart
              options={salesData.options}
              series={salesData.series}
              type="bar"
              height={350}
            />

            <div className="flex flex-row justify-between mx-8 mb-5 mt-5">
              <button
                id="dropdownDefaultButton"
                onClick={toggleDropdown}
                className={`border-2 border-[#e676aa] px-4 py-1 lg:w-1/4 rounded-md ${
                  chartType === "month" ? "bg-[#e676aa] text-white" : ""
                }`}
                type="button"
              >
                Month
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-24 py-2 m-6">
                  <ul
                    className="py-2 text-sm text-gray-700"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {monthNames.map((month, index) => (
                      <li key={index}>
                        <a
                          onClick={() => handleMonth(index)}
                          href="#"
                          className="block px-4  hover:bg-gray-100"
                        >
                          {month}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => handleButtonClick("year")}
                className={`border-2 border-[#e676aa] px-4 py-1 lg:w-1/4 rounded-md ${
                  chartType === "year" ? "bg-[#e676aa] text-white" : ""
                }`}
              >
                Year
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12  lg:mx-auto lg:pb-20 color_home">
        <div className="box col-span-12 text-center lg:ml-[85px]  mt-16 lg:text-left mb-3">
          <Blockquote className="text-2xl not-italic font-bold text-[#BE55A9]">
            ORDERS
          </Blockquote>
          <Blockquote className="text-lg mt-6 not-italic font-semibold">
            My Orders
          </Blockquote>
        </div>
        <div className="box col-span-12 lg:mx-20">
          <DashboardTab />
        </div>
      </div>
    </ArtistLayout>
  );
};

export default Dashboard;
