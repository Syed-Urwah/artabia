"use client";
import Layout from "@/components/layout/layout";
import Link from "next/link";
import { Label, Select } from "flowbite-react";
const Payment = () => {
  return (
    <Layout>
      <div className="lg:px-16 px-4 py-16">
        <p className="col-span-full text-3xl font-bold">Adding New Card Info</p>

        <div className="py-8 w-full">
          <p className="col-span-full  font-bold bg-[#8C0D81] bg-opacity-30 px-4 py-2 rounded-full relative z-20">
            Card Information
          </p>
          <div className="relative overflow-x-auto rounded-lg mt-[-15px]">
            <div className="p-6 bg-[#F8F8F8] border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 ">
              <div className="">
                <div className="grid grid-cols-12 mt-4 gap-5">
                  <div className="box col-span-12 lg:col-span-6 md:col-span-6 flex flex-row items-center">
                    <label
                      htmlFor="email"
                      className="text-gray-500 font-normal text-lg mr-6 lg:mr-4 "
                    >
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="userName"
                      aria-describedby="helper-text-explanation"
                      className=" bg-[#E8F0FE] border border-[#CCC] text-black-900 text-sm block p-2 w-full lg:w-[466px]"
                      placeholder="Card Number"
                    />
                  </div>
                  <div className="box col-span-6 lg:col-span-3 md:col-span-3 flex flex-row items-center">
                    <label
                      htmlFor="Month"
                      className="text-gray-500 font-normal text-lg mr-10 lg:mr-[20px] "
                    >
                      Month
                    </label>
                    <select
                      id="Month"
                      className="bg-[#E8F0FE] border border-[#CCC] text-black-900 text-sm block p-2 w-full lg:w-[466px]"
                      required
                    >
                      <option>Month</option>
                      <option>Canada</option>
                      <option>France</option>
                      <option>Germany</option>
                    </select>
                  </div>

                  <div className="box col-span-6 lg:col-span-3 md:col-span-3 flex flex-row items-center">
                    <label
                      htmlFor="Year"
                      className="text-gray-500 font-normal text-lg mr-10 lg:mr-[20px] "
                    >
                      Year
                    </label>
                    <select
                      id="Year"
                      className="bg-[#E8F0FE] border border-[#CCC] text-black-900 text-sm block p-2 w-full lg:w-[466px]"
                      required
                    >
                      <option>Year</option>
                      <option>Canada</option>
                      <option>France</option>
                      <option>Germany</option>
                      <option>italy</option>
                    </select>
                  </div>

                  <div className="box col-span-12 lg:col-span-6 md:col-span-6 flex flex-row items-center">
                    <label
                      htmlFor="email"
                      className="text-gray-500 font-normal text-lg mr-10 lg:mr-[79px] "
                    >
                      CVV2
                    </label>
                    <input
                      type="text"
                      id="CVV2"
                      aria-describedby="helper-text-explanation"
                      className=" bg-[#E8F0FE] border border-[#CCC] text-black-900 text-sm block p-2 w-full lg:w-[466px]"
                      placeholder="CVV2"
                    />
                  </div>
                  <div className="box col-span-12 lg:col-span-6 md:col-span-6 flex flex-row items-center">
                    <label className="text-gray-500 font-normal text-lg mr-3  ">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      id="CVV2"
                      aria-describedby="helper-text-explanation"
                      className=" bg-[#E8F0FE] border border-[#CCC] text-black-900 text-sm block p-2 w-full lg:w-[466px]"
                      placeholder="Card Holder Name"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="col-span-full  text-2xl font-bold px-1 py-2 mt-6">
            Your Comment
          </p>
          <div className="relative overflow-x-auto  rounded-3xl ">
            <div className="p-6 bg-[#F8F8F8] border border-gray-200  rounded-3xl  shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="mx-auto ">
                <textarea
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-[#FFF]  rounded-3xl  border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Please insert your comment to the order here. If you do not want to leave a comment leave this field empty..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center gap-4 mt-5">
          <Link href="/card">
            <button
              style={{ border: "2px solid #F1C4D9", color: "black" }}
              className="px-10 py-1 rounded-full flex items-center"
            >
              Save
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
