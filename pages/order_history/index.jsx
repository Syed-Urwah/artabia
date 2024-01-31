import Layout from "@/components/layout/layout";
import React, { useState, useEffect } from "react";
import { Blockquote } from "flowbite-react";
import OrderHistory from "@/components/OrderHistory/orderHistory";
import { FormattedMessage } from "react-intl";

const Dashboard = () => {
  return (
    <Layout>
      <div className="grid grid-cols-12  lg:mx-auto lg:pb-20 color_home">
        <div className="box col-span-12 text-center lg:ml-[85px]  mt-16 lg:text-left mb-3">
          <Blockquote className="text-2xl not-italic font-bold text-[#BE55A9]">
            <FormattedMessage
              id="ORDERS HISTORY"
              values={{ b: (info) => <b>{info}</b> }}
            />
          </Blockquote>
          <Blockquote className="text-lg mt-6 not-italic font-semibold">
            <FormattedMessage
              id="My Orders"
              values={{ b: (info) => <b>{info}</b> }}
            />
          </Blockquote>
        </div>
        <div className="box col-span-12 lg:mx-20">
          <OrderHistory />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
