"use client";

import { getLocalToken } from "@/enviroment/auth";
import axios from "axios";
import { Button, Table, Tabs } from "flowbite-react";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import Swal from "sweetalert2";

const DashboardTab = () => {
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
          "http://admin.artabiasa.com/api/get-active-completed-artist",
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
          "http://admin.artabiasa.com/api/get-active-order-artist",
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

  const getActiveOrder = async () => {
    try {
      const { data } = await axios.post(
        "http://admin.artabiasa.com/api/get-active-order-artist",
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
  const ApprovedOrderArtist = async (id, status) => {
    try {
      let apiend_point;
      if (status == "Preparing") {
        apiend_point =
          "http://admin.artabiasa.com/api/send-to-captin-order-artist";
      }
      if (status == "Active") {
        apiend_point = "http://admin.artabiasa.com/api/approved-order-artist";
      }
      const { data } = await axios.post(
        apiend_point,
        {
          id: id,
          api_password: process.env.REACT_APP_API_PASSWORD,
        },
        {
          headers: {
            Authorization: "Bearer " + getLocalToken(),
          },
        }
      );
      console.log("API  =>", data.data);

      if (data.status === "true") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Approved Order!",
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            getActiveOrder();
          }
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
                <FormattedMessage
                  id="Order Id"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                <FormattedMessage
                  id="Customer Name"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                <FormattedMessage
                  id="Sub Total"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                <FormattedMessage
                  id="Delivery Price"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                <FormattedMessage
                  id="Total"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </Table.HeadCell>

              <Table.HeadCell
                style={{ backgroundColor: "lightgray", borderRadius: 0 }}
              >
                <FormattedMessage
                  id="Order Status"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" ,borderRadius: 0 }}>
                <FormattedMessage
                  id="Action"
                  values={{ b: (info) => <b>{info}</b> }}
                />
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
                      <Button
                        onClick={() =>
                          ApprovedOrderArtist(
                            order.id,
                            order.ordersstatus_id.ordersstatus_etext
                          )
                        }
                        color="light"
                      >
                        Change Status
                      </Button>
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
                <FormattedMessage
                  id="Order Id"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                <FormattedMessage
                  id="Customer Name"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                <FormattedMessage
                  id="Sub Total"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                <FormattedMessage
                  id="Delivery Price"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </Table.HeadCell>
              <Table.HeadCell style={{ backgroundColor: "lightgray" }}>
                <FormattedMessage
                  id="Total"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </Table.HeadCell>
              <Table.HeadCell
                style={{ backgroundColor: "lightgray", borderRadius: 0 }}
              >
                <FormattedMessage
                  id="Order Status"
                  values={{ b: (info) => <b>{info}</b> }}
                />
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
export default DashboardTab;
