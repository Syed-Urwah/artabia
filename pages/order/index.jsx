"use client";
import Layout from "@/components/layout/layout";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useState } from "react";
import { Modal } from "flowbite-react";
const Order = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Layout>
      <div className="lg:px-16 px-4 py-16">
        <p className="col-span-full text-3xl font-bold ">Order Information</p>

        <div className="col-span-full flex flex-row  bg-[#8C0D81] bg-opacity-30 px-10 py-2 rounded-full relative z-20 justify-around">
          <p className="font-bold w-1/2">Supplier Info</p>
          <p className="font-bold w-1/2 px-5">Customer Info</p>
        </div>
        <div className="relative overflow-x-auto rounded-lg mt-[-15px]">
          <div className="flex flex-row p-10 bg-[#F8F8F8] border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 ">
            <div className="flex flex-col w-1/2  border-r border-gray-300">
              <span class=" text-gray-600  dark:text-white">
                Yaseen Sheikh.{" "}
              </span>
              <span className="text-gray-500">Jeddah 21452</span>
              <span className="text-gray-500 font-semibold">
                204 Alamal Plaza Hail Street PO Box 6659
              </span>

              <span className="text-gray-500 mt-6">
                Company Registration Number:
                <span className="text-gray-500 lg:ml-1">4446885</span>
              </span>

              <span className="text-gray-500 ">
                TIN:
                <span className="text-gray-500 lg:ml-1">2655755956</span>
              </span>
              <span className="text-gray-500 ">
                VAT Registration Number:
                <span className="text-gray-500 lg:ml-1">SK066844662</span>
              </span>

              <span className="text-gray-500 ">
                IBAN:
                <span className="text-gray-500 lg:ml-1">
                  SK982655555555566589254
                </span>
              </span>
              <span className="text-gray-500 ">
                SWIFT:
                <span className="text-gray-500 lg:ml-1">GLSKAOXH</span>
              </span>

              <span className="text-gray-500 mt-6">
                Phone Number:
                <span className="text-gray-500 lg:ml-1">+966 265 5456318</span>
              </span>

              <span className="text-gray-500 ">
                Email:
                <span className="text-gray-500 lg:ml-1">
                  victory@example.com
                </span>
              </span>
              <span className="text-gray-500 ">
                Contact Person:
                <span className="text-gray-500 lg:ml-1">Yaseen Sheikh</span>
              </span>
              <span className="text-gray-500 mt-6">
                The company is registered at the District Court, Section 1:
                Number 21452/V
              </span>
            </div>

            <div className="flex flex-col w-1/2 pl-6">
              <span class=" text-gray-600  dark:text-white">Hussain</span>
              <span className="text-gray-500">Karachi</span>
              <span className="text-gray-500">75400 P.E.C.H.S</span>
              <span className="text-gray-500">Pakistan</span>

              <span className="text-gray-500 mt-16">
                Phone Number:
                <span className="text-gray-500 lg:ml-1">+92 349 6210685</span>
              </span>

              <span className="text-gray-500 ">
                Email:
                <span className="text-gray-500 lg:ml-1">huxxain@gmail.com</span>
              </span>
              <span className="text-gray-500 underline ">
                Change Delivery Data!
              </span>
            </div>
          </div>
        </div>

        <div className="py-8 w-full">
          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-center text-gray-700 uppercase bg-[#dcdada] dark:bg-gray-700 dark:text-gray-400 bg-opacity-30 rounded-full">
                <tr>
                  <th scope="col" class=" -px-2 py-3 rounded-full">
                    Image
                  </th>
                  <th scope="col" class="px-6 py-3 rounded-full">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3 rounded-full">
                    Unit price without VAT
                  </th>
                  <th scope="col" class="px-6 py-3 rounded-full">
                    Quantity
                  </th>
                  <th scope="col" class="px-6 py-3 rounded-full">
                    Total with VAT
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                  <td class=" flex justify-center py-4 text-gray-900 whitespace-nowrap dark:text-white  ">
                    <img
                      src="/img/card3.png"
                      class="w-[100px] h-[100px]"
                      alt="Search"
                    />
                  </td>
                  <td class="px-6 py-4  text-start ">
                    <div className="flex flex-col">
                      <span class="mb-1">Animal Love</span>
                      <span class="mb-1">
                        Availability:{" "}
                        <span class="text-[#FF0078]">In Stock</span>
                      </span>
                    </div>
                  </td>

                  <td class="px-6 py-4 text-center">14000 SAR</td>
                  <td class="px-6 py-4 text-center">
                    <div class="border border-black rounded-full inline-block px-6">
                      1
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">15000 SAR</td>
                </tr>

                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                  <td class=" flex justify-center py-4 text-gray-900 whitespace-nowrap dark:text-white  ">
                    <img
                      src="/img/card3.png"
                      class="w-[100px] h-[100px]"
                      alt="Search"
                    />
                  </td>
                  <td class="px-6 py-4  text-start ">
                    <div className="flex flex-col">
                      <span class="mb-1">Animal Love</span>
                      <span class="mb-1">
                        Availability:{" "}
                        <span class="text-[#FF0078]">In Stock</span>
                      </span>
                    </div>
                  </td>

                  <td class="px-6 py-4 text-center">14000 SAR</td>
                  <td class="px-6 py-4 text-center">
                    <div class="border border-black rounded-full inline-block px-6">
                      1
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">15000 SAR</td>
                </tr>
              </tbody>
            </table>

            <div className="text-left items-center">
              <p className="col-span-full mt-5  lg:mx-32 text-1xl text-gray-400 font-normal ">
                Courier (Countries in European Union)
              </p>
            </div>

            <div className="flex flex-row justify-end gap-4 mt-3 ">
              <div className="flex flex-col ">
                <div class="max-w-sm p-6 bg-[#F8F8F8] border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700">
                  <h5 class="mb-1   tracking-tight text-gray-900 dark:text-white">
                    PAYMENT METHOD
                  </h5>
                  <div className="flex flex-col   ">
                    <span className="text-gray-500">Bank Account:</span>
                    <span className="text-gray-500">TOTAL PRICE</span>
                  </div>
                  <div className="flex flex-row justify-between  ">
                    <span className="text-gray-500">
                      Total price without VAT:
                    </span>
                    <span className="text-gray-500 lg:ml-3">19500 SAR</span>
                  </div>
                  <div className="flex flex-row justify-between  ">
                    <span className="text-black-500 font-semibold">
                      Total price with VAT:
                    </span>
                    <span className="font-semibold">21000 SAR</span>
                  </div>
                </div>
                <div className="flex items-center mb-4 rounded-full bg-gray-100 p-3 mt-2 border border-gray-400">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 border-gray-300  focus:ring-blue-200"
                  />
                  <label
                    for="default-checkbox"
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    I agree with the terms and conditions.
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between gap-4 mt-5">
              <Link href="/shipping">
                <button className="flex flex-row bg-opacity-20 lg:rounded-full px-4 py-2 border border-black bg-[#b9b4b4] items-center">
                  <HiOutlineArrowLeft className="mr-1 h-5 w-7 " /> Back to the
                  Shipping Address
                </button>
              </Link>

              <button
                onClick={() => setOpenModal(true)}
                className="bg-opacity-20 lg:rounded-full px-6 py-2  bg-[#F21079]"
              >
                Send the Order with Payment Obligation
              </button>
              <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header
                  style={{
                    border: 0,
                    backgroundImage: 'url("/img/layer_1.png")',
                    backgroundSize: "cover",
                  }}
                  className="h-[5px]"
                ></Modal.Header>
                <Modal.Body
                  style={{
                    border: 0,
                    backgroundImage: 'url("/img/layer_1.png")',
                    backgroundSize: "cover",
                  }}
                >
                  <div className="flex justify-center">
                    <div className="flex flex-col   items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-pink-400 border-pink-400 border-solid border-2 mb-1 rounded-full "
                        viewBox="0 0 20 20"
                        fill="none"
                        style={{ padding: "4px" }}
                      >
                        <path
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-3xl">
                        Your Art Journey Just Started
                      </span>
                      <p className="text-sm font-normal">
                        Thank You FOR YOUR ORDER! GREAT CHOICE!
                      </p>
                      <button className="text-sm bg-opacity-20 rounded-full px-2 py-1 mt-5 mb-5 bg-[#F21079]">
                        Proceed to checkout
                      </button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
