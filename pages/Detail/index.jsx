"use client";
import OrderHistory from "@/components/OrderHistory/orderHistory";
import Layout from "@/components/layout/layout";
import { Button } from "flowbite-react";
import Link from "next/link";

const Shipping = () => {
  return (
    <Layout>
      <div className="lg:px-16 px-4 py-16">
        <p className="col-span-full text-3xl font-bold">Order History</p>

        <div className="py-8 w-full">
          <div className="col-span-full flex justify-between font-bold bg-[#8C0D81] bg-opacity-30 px-4 py-2 rounded-full relative z-20">
            <p className="ml-5">Order Delivered</p>
            <span className="font-bold mr-10">
              Cash:<span className="ml-2">2000</span>
            </span>
          </div>
          <div className="relative overflow-x-auto rounded-lg mt-[-15px]">
            <div className="p-6 bg-[#F8F8F8] border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 ">
              <div className="col-span-full flex flex-row justify-between gap-x-5">
                <div className="flex flex-col ml-5">
                  <span className="font-bold ">Noor</span>
                  <span className=""> 100 X 100</span>
                  <span className=""> Acrylic</span>
                  <span className="">
                    {" "}
                    Date: <span>11/12/2024</span>{" "}
                  </span>
                  <span className="">
                    {" "}
                    Total charges: <span>80</span>{" "}
                  </span>
                  <span className="">
                    {" "}
                    Total Amount Due: <span>80</span>{" "}
                  </span>
                  <span className="">
                    {" "}
                    Service charges: <span>80</span>{" "}
                  </span>
                </div>
                <div>
                  <img
                    src="/img/p_1.png"
                    className="w-[270px] h-[150px] rounded-md mr-5"
                    alt="Search"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex justify-around items-center">
          <img
            src="/img/p_1.png"
            className="w-[150px] h-[100px] rounded-md mr-5"
            alt="Search"
          />
       
          <Link href={<OrderHistory />}>
            <Button color="light">Back to Order History </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
