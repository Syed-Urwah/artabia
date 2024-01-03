"use client";
import Layout from "@/components/layout/layout";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineTrash } from "react-icons/hi";
import { useState } from "react";

const Card = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSelectCard = (index) => {
    setSelectedCard(index === selectedCard ? null : index);
  };

  const handleDeleteCard = (index) => {
    console.log(`Deleting Card at index ${index}`);
  };
  return (
    <Layout>
      <div className="lg:px-16 px-4 py-16">
        <p className="col-span-full text-3xl font-bold">Payment & Delivery</p>

        <div className="py-3 w-full">
          <div
            className={`col-span-full  font-bold bg-[#8C0D81] bg-opacity-30 px-4 py-2 rounded-full relative z-20 mt-6 flex justify-between items-center ${
              selectedCard === 1 ? "bg-pink-500" : ""
            }`}
          >
            <label className="flex items-center">
              {/* Checkbox */}
              <input
                type="radio"
                id="payment_type"
                checked={selectedCard === 1}
                onChange={() => handleSelectCard(1)}
                className="mr-2"
              />
              {/* Card Text */}
              <p>Cash On Delivery</p>
            </label>
          </div>
          <div
            className={`col-span-full  font-bold bg-[#8C0D81] bg-opacity-30 px-4 py-2 rounded-full relative z-20 mt-6 flex justify-between items-center ${
              selectedCard === 2 ? "bg-pink-500" : ""
            }`}
          >
            <label className="flex items-center">
              {/* Checkbox */}
              <input
                type="radio"
                id="payment_type"
                checked={selectedCard === 2}
                onChange={() => handleSelectCard(2)}
                className="mr-2"
              />
              {/* Card Text */}
              <p>Card</p>
            </label>
          </div>

          <div className="relative overflow-x-auto rounded-lg mt-[-15px]">
            <div className="p-6 bg-[#F8F8F8] border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 ">
              <div className="flex lg:flex-row flex-col py-4 gap-x-5 gap-y-4 overflow-x-auto">
                <div className="bg-[#fef3f8] rounded-xl px-5 py-5 border-[#BE55A9] border-2 h-100 w-[266px]">
                  <div className="flex justify-between">
                    <p className="font-bold">Card 1:</p>
                    <HiOutlineTrash
                      className="ml-2 h-6 w-10 cursor-pointer"
                      onClick={() => handleDeleteCard(1)}
                    />
                  </div>
                  <div>
                    <h1 className="font-bold">Muhammad Urwa</h1>
                  </div>
                  <div className="flex ">
                    <h1 className="font-bold">IBAN:</h1>
                    <h1>*****963</h1>
                  </div>
                  <div className="flex ">
                    <h1>Bank: </h1>
                    <h1>ABL</h1>
                  </div>
                  <div className="flex ">
                    <h1>Validity:</h1>
                    <h1>11/2023</h1>
                  </div>
                </div>

                <div className="bg-[#fef3f8] rounded-xl px-5 py-5 border-[#BE55A9] border-2 h-100 w-[266px]">
                  <div className="flex justify-between">
                    <p className="font-bold">Card 1:</p>
                    <HiOutlineTrash
                      className="ml-2 h-6 w-10 cursor-pointer"
                      onClick={() => handleDeleteCard(1)}
                    />
                  </div>
                  <div>
                    <h1 className="font-bold">Muhammad Urwa</h1>
                  </div>
                  <div className="flex ">
                    <h1 className="font-bold">IBAN:</h1>
                    <h1>*****963</h1>
                  </div>
                  <div className="flex ">
                    <h1>Bank: </h1>
                    <h1>ABL</h1>
                  </div>
                  <div className="flex ">
                    <h1>Validity:</h1>
                    <h1>11/2023</h1>
                  </div>
                </div>
                <div className="bg-[#fef3f8] rounded-xl px-5 py-5 border-[#BE55A9] border-2 h-100 w-[266px]">
                  <div className="flex justify-between">
                    <p className="font-bold">Card 1:</p>
                    <HiOutlineTrash
                      className="ml-2 h-6 w-10 cursor-pointer"
                      onClick={() => handleDeleteCard(1)}
                    />
                  </div>
                  <div>
                    <h1 className="font-bold">Muhammad Urwa</h1>
                  </div>
                  <div className="flex ">
                    <h1 className="font-bold">IBAN:</h1>
                    <h1>*****963</h1>
                  </div>
                  <div className="flex ">
                    <h1>Bank: </h1>
                    <h1>ABL</h1>
                  </div>
                  <div className="flex ">
                    <h1>Validity:</h1>
                    <h1>11/2023</h1>
                  </div>
                </div>
                <div className="flex justify-center ">
                  <Link href="/payment">
                    <button
                      style={{ border: "2px solid #F1C4D9", color: "black" }}
                      className="px-10 rounded-full flex items-center"
                    >
                      Comming Soon{" "}
                      <span className="font-bold text-2xl ml-1 mb-1">-</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-4 mt-5">
          <Link href="/all_shipping">
            <button className="flex flex-row bg-opacity-20 lg:rounded-full px-4 py-2 border border-black bg-[#b9b4b4] items-center">
              <HiOutlineArrowLeft className="mr-1 h-5 w-7 " /> Back to the
              Shipping Address
            </button>
          </Link>
          <Link href="/order">
            <button className="bg-opacity-20 lg:rounded-full px-6 py-2  bg-[#F21079]">
              Continue to Review Your Order
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Card;
