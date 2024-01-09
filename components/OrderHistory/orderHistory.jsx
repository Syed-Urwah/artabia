"use client";

import { getLocalToken } from "@/enviroment/auth";
import axios from "axios";
import { Button, Table, Tabs } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeOrder, setActiveOrder] = useState([]);
  const [completeOrder, setCompleteOrder] = useState([]);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    const getCompleteOrder = async () => {
      try {
        const { data } = await axios.post(
          "http://admin.artabiasa.com/api/get-active-completed",
          {
            api_password: process.env.REACT_APP_API_PASSWORD,
          },
          {
            headers: {
              Authorization: "Bearer " + getLocalToken(),
            },
          }
        );
        console.log("API Response =>", data.data);

        if (data.status === "true") {
          setCompleteOrder(data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getCompleteOrder();
  }, []);

  useEffect(() => {
    const getActiveOrder = async () => {
      try {
        const { data } = await axios.post(
          "http://admin.artabiasa.com/api/get-active-order",
          {
            api_password: process.env.REACT_APP_API_PASSWORD,
          },
          {
            headers: {
              Authorization: "Bearer " + getLocalToken(),
            },
          }
        );
        console.log("API Response =>", data.data);

        if (data.status === "true") {
          setActiveOrder(data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getActiveOrder();
  }, []);

  return (
    <>
      <Tabs
        className=" flex justify-center gap-10 overflow-x-auto pt-1 pb-1 "
        activeIndex={activeTab}
        onChange={handleTabChange}
        aria-label="Default tabs"
        style="default"
      >
        <Tabs.Item title="Active Order">
          <Table>
            <Table.Head>
              <Table.HeadCell
                style={{ backgroundColor: "lightgray", borderRadius: 0 }}
              >
                Order Id
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                Customer Name
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                Sub Total
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                Delivery Price
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                Total
              </Table.HeadCell>

              <Table.HeadCell
                style={{ backgroundColor: "lightgray", borderRadius: 0 }}
              >
                Order Status
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                View
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {Array.isArray(activeOrder) ? (
                activeOrder.map((order, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{order.id}</Table.Cell>
                    <Table.Cell>{order.user_id.pers_etext}</Table.Cell>
                    <Table.Cell>{order.sub_total}</Table.Cell>
                    <Table.Cell>{order.delivery_price}</Table.Cell>
                    <Table.Cell>{order.final_total}</Table.Cell>
                    <Table.Cell>
                      <span className="active-status">
                        {order.ordersstatus_id.ordersstatus_etext}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link href={`order_history/${order.id}`}>
                        <Button color="light">Detail </Button>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={6}>No active orders</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Tabs.Item>
        <Tabs.Item title="Completed Order">
          <Table>
            <Table.Head>
              <Table.HeadCell
                style={{ backgroundColor: "lightgray", borderRadius: 0 }}
              >
                Order Id
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                Customer Name
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                Sub Total
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                Delivery Price
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                Total
              </Table.HeadCell>
              <Table.HeadCell
                style={{ backgroundColor: "lightgray", borderRadius: 0 }}
              >
                Order Status
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {Array.isArray(completeOrder) ? (
                completeOrder.map((order, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{order.id}</Table.Cell>
                    <Table.Cell>{order.user_id.pers_etext}</Table.Cell>
                    <Table.Cell>{order.sub_total}</Table.Cell>
                    <Table.Cell>{order.delivery_price}</Table.Cell>
                    <Table.Cell>{order.final_total}</Table.Cell>
                    <Table.Cell>
                      <span className="active-status">
                        {order.ordersstatus_id.ordersstatus_etext}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={6}>No Complete orders</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Tabs.Item>
      </Tabs>
    </>
  );
};
export default OrderHistory;
