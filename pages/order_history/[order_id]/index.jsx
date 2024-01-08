"use client";
import OrderHistory from "@/components/OrderHistory/orderHistory";
import Layout from "@/components/layout/layout";
import { getLocalToken } from "@/pages/enviroment/auth";
import axios from "axios";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

const Shipping = () => {
  const router = useRouter();
  const [order_id, setOrderID] = useState(null);
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (router.query.order_id) {
      setOrderID(router.query.order_id);
    }
  }, [router.query.order_id]);
  useEffect(() => {
    const getOrder = async () => {
      console.log("id", order_id);
      setIsLoading(true);
      try {
        const { data } = await axios.post(
          "http://admin.artabiasa.com/api/get-order-view",
          {
            order_id: order_id,
            api_password: process.env.REACT_APP_API_PASSWORD,
          },
          {
            headers: {
              Authorization: "Bearer " + getLocalToken(),
              Accept: "application/json",
            },
          }
        );

       
        console.log("Order ->", data);
        if (data.status === "true") setOrder(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    if (order_id) getOrder();
  }, [order_id]);
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
            {isLoading ? (
              <div className="flex justify-center self-center" role="status">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="p-6 bg-[#F8F8F8] border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 ">
                <div className="col-span-full flex flex-row justify-between gap-x-5">
                  <div className="flex flex-col ml-5">
                    <span className="font-bold ">
                      {order?.artw_fk?.artw_etext ?? ""}
                    </span>
                    <span className="">
                      {" "}
                      {order?.artw_fk?.artw_length ?? ""} X{" "}
                      {order?.artw_fk?.artw_width ?? ""}
                    </span>
                    <span className="">
                      {" "}
                      {order?.artw_fk?.artw_dimensions ?? ""}
                    </span>
                    <span className="">
                      {" "}
                      Date: <span>{order?.artw_fk?.created_at ?? ""}</span>{" "}
                    </span>
                    <span className="">
                      {" "}
                      Sub Total: <span>
                        {order?.sub_total ?? ""}
                      </span>{" "}
                    </span>
                    <span className="">
                      {" "}
                      Deliver Price:{" "}
                      <span>{order?.delivery_price ?? ""}</span>{" "}
                    </span>
                    <span className="">
                      {" "}
                      Total Price:{" "}
                      <span>{order?.final_total ?? ""}</span>{" "}
                    </span>
                  </div>
                  <div>
                    <QRCode value={`${order?.reference ?? "00"}`} size={150} />

                    {/* <img
                    src="/img/p_1.png"
                    className="w-[270px] h-[150px] rounded-md mr-5"
                    alt="Search"
                  /> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className=" flex justify-around items-center">
          {/* <img
            src="/img/p_1.png"
            className="w-[150px] h-[100px] rounded-md mr-5"
            alt="Search"
          /> */}

          <Link href="/order_history">
            <Button color="light">Back to Order History </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
