import Layout from "@/components/layout/layout";
import React, { useState, useEffect } from "react";
import { Blockquote } from "flowbite-react";

import { Table } from "flowbite-react";
import dynamic from "next/dynamic";
import { getLocalToken } from "../enviroment/auth";
import axios from "axios";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Dashboard = () => {
  const [financialsData, setFinancialsData] = useState({
    series: [
      {
        name: "Financials",
        data: [500, 1000, 750, 1200, 800, 600, 900, 1100, 950, 1300, 700, 850],
      },
    ],
    options: {
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
    },
  });







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
        categories: [
        ],
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
              Authorization: 'Bearer ' + getLocalToken(),
            },
          }
        );
        console.log("API Response =>", data);
  
        if (data.status === "true") {
          console.log(data);
          const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thersday", "Friday", "Satarday", "Sunday"];
          console.log('sales of data', salesData);
          const newSalesData = daysOfWeek.map((day) => parseFloat(data[day.toLowerCase()]));
          console.log(newSalesData);
          const countSalesData = daysOfWeek.map((day) => parseFloat(data[`${day.toLowerCase()}_count_sales`]));
  
          setSalesData((prevData) => {
            const newSeries = [{
              name: "Sales",
              data: newSalesData,
            }];
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    getSales();
  }, []);
  

  const [chartType, setChartType] = useState("month"); // 'month' or 'year'

  const handleButtonClick = (type) => {
    setChartType(type);
  };
  const [orderId, setOrderId] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [orderStatus, setOrderStatus] = useState("all"); // Default value 'all'

  const handleSearch = () => {
    // Implement your search logic here
  };



  return (
    <Layout>
      <div className="grid grid-cols-12  py-10">
        <div className="col-span-12 lg:col-span-6 flex flex-col   justify-center">
          <p className="font-bold text-center text-[#BE55A9] text-2xl">
            Financials
          </p>
          <div id="financialsChart" className="lg:mx-10 lg:mt-16 mt-10">
            <div className="flex flex-row mb-7">
              <img
                src="/img/wallet.png"
                className="w-[50px]  ml-4 mr-2 "
                alt="Search"
              />
              <div className="flex flex-col">
                <p>Your Balance in ARTABIA Wallet</p>
                <p className="font-semibold">SAR 0</p>
              </div>
            </div>
            <ReactApexChart
              options={
                chartType === "month"
                  ? financialsData.options
                  : { xaxis: { categories: ["2020", "2021", "2022", "2023"] } }
              }
              series={financialsData.series}
              type="bar"
              height={350}
            />

            <div className="flex flex-row justify-around mx-8 ">
              <button
                onClick={() => handleButtonClick("month")}
                className={`border-2 border-[#e676aa] px-4 py-1 lg:w-1/4 rounded-md ${chartType === "month" ? "bg-[#e676aa] text-white" : ""
                  }`}
              >
                Month
              </button>
              <button
                onClick={() => handleButtonClick("year")}
                className={`border-2 border-[#e676aa] px-4 py-1 lg:w-1/4 rounded-md ${chartType === "year" ? "bg-[#e676aa] text-white" : ""
                  }`}
              >
                Year
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-12  lg:col-span-6 flex flex-col   justify-center">
          <p className="font-bold text-center text-[#BE55A9] text-2xl lg:mt-0 lg:mb-0 mt-10 mb-10">
            SALES
          </p>
          <div id="salesChart" className="lg:mx-10 lg:mt-36">
            <ReactApexChart
              options={
                chartType === "month"
                  ? salesData.options
                  : { xaxis: { categories: ["2020", "2021", "2022", "2023"] } }
              }
              series={salesData.series}
              type="bar"
              height={350}
            />

            <div className="flex flex-row justify-around mx-8 ">
              <button
                onClick={() => handleButtonClick("month")}
                className={`border-2 border-[#e676aa] px-4 py-1 lg:w-1/4 rounded-md ${chartType === "month" ? "bg-[#e676aa] text-white" : ""
                  }`}
              >
                Month
              </button>
              <button
                onClick={() => handleButtonClick("year")}
                className={`border-2 border-[#e676aa] px-4 py-1 lg:w-1/4 rounded-md ${chartType === "year" ? "bg-[#e676aa] text-white" : ""
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
            ORDER HISTORY
          </Blockquote>
          <Blockquote className="text-lg mt-6 not-italic font-semibold">
            My Orders
          </Blockquote>
        </div>

        <div className="col-span-12 flex justify-end lg:mx-20 ">
          <button className="px-6 mx-1 py-2 bg-black text-white ">
            <span>Download All Invoice Slips</span>
          </button>
          <button className="px-6 mx-1 py-2  bg-black text-white ">
            Download All Shipping Slips
          </button>
        </div>

        <div className="col-span-12 mt-2 mb-6 lg:mx-20">
          <hr className="w-full border-gray-500" />
        </div>

        <div className=" col-span-12 overflow-x-auto lg:mx-20">
          <Table>
            <Table.Head>
              <Table.HeadCell
                style={{ backgroundColor: "lightgray", borderRadius: 0 }}
              >
                Order Id
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                Date From
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                Date To
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                Order Status
              </Table.HeadCell>

              <Table.HeadCell
                style={{ backgroundColor: "lightgray", borderRadius: 0 }}
              >
                <span className="sr-only">Submit</span>
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              <Table.Row>
                <Table.Cell>
                  <input
                    type="text"
                    placeholder="Search by Order Id"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className=" w-60"
                  />
                </Table.Cell>
                <Table.Cell>
                  <div className="flex flex-col relative">
                    <input
                      type="date"
                      id="dateFrom"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="mr-2 w-60"
                    />
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex flex-col relative">
                    <input
                      type="date"
                      id="dateTo"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="mr-2 w-60"
                    />
                  </div>
                </Table.Cell>

                <Table.Cell>
                  <select
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                    className=" w-80"
                  >
                    <option value="all">All</option>
                    <option value="inProcess">In Process</option>
                    <option value="complete">Complete</option>
                  </select>
                </Table.Cell>

                <Table.Cell>
                  <a className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    Submit
                  </a>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

{
  /* <div className="col-span-12  lg:col-span-6 flex flex-col   justify-center">
          <p className="font-bold text-center text-[#BE55A9] text-2xl lg:mt-0 lg:mb-0 mt-10 mb-10">
            SALES
          </p>
          <div id="salesChart" className="lg:mx-10 lg:mt-36">
            <ReactApexChart
              options={salesData.options}
              series={salesData.series}
              type="bar"
              height={350}
            />

            <div className="flex flex-row justify-around mx-8 ">
              <div className="flex flex-row justify-between border-2 border-[#e676aa] px-4 py-1 lg:w-1/4 rounded-md">
                <span>Month</span>
                <span>2000</span>
              </div>
              <div className="flex flex-row justify-between border-2 border-[#e676aa] px-4 py-1 lg:w-1/4 rounded-md">
                <span>yearly</span>
                <span>2000</span>
              </div>
            </div>
          </div>
        </div> */
}
