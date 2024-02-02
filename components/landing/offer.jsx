"use client";
import { FormattedMessage, useIntl } from "react-intl";

import { Blockquote } from "flowbite-react";

const Offer = () => {
  return (
    <>
      <div className="grid grid-cols-12 text-center lg:mx-48 lg:mb-20 lg:mt-20 mb-10 mx-2">
        <div className="col-span-12 mt-16">
          <Blockquote className="text-lg not-italic font-bold">
            <FormattedMessage
              id="WHAT ARTABIA OFFERS"
              values={{ b: (info) => <b>{info}</b> }}
            />
          </Blockquote>
          <Blockquote className="text-sm not-italic font-semibold">
            <FormattedMessage
              id="OFFERS"
              values={{ b: (info) => <b>{info}</b> }}
            />
          </Blockquote>
        </div>

        <div className="box col-span-6  lg:col-span-3 md:col-span-4">
          <button
            style={{ background: "#F1C4D9", color: "black" }}
            className=" px-10 py-2 mt-14 rounded-full  "
          >
            {" "}
            <FormattedMessage
              id="Artistic Showcase"
              values={{ b: (info) => <b>{info}</b> }}
            />
          </button>
        </div>
        <div className="box col-span-6  lg:col-span-3 md:col-span-2">
          <button
            style={{ background: "#F1C4D9", color: "black" }}
            className=" px-10 py-2 mt-14 rounded-full "
          >
            <FormattedMessage
              id="Excellence Curation"
              values={{ b: (info) => <b>{info}</b> }}
            />
          </button>
        </div>
        <div className="box col-span-6  lg:col-span-3 md:col-span-3">
          <button
            style={{ background: "#F1C4D9", color: "black" }}
            className=" px-10 py-2 mt-14 rounded-full "
          >
            <FormattedMessage
              id="Connectivity & Elevation"
              values={{ b: (info) => <b>{info}</b> }}
            />
          </button>
        </div>
        <div className="box col-span-6  lg:col-span-3 md:col-span-3">
          <button
            style={{ background: "#F1C4D9", color: "black" }}
            className=" px-10 py-2 mt-14 rounded-full "
          >
            <FormattedMessage
              id="Client Friendly"
              values={{ b: (info) => <b>{info}</b> }}
            />
          </button>
        </div>

        {/* <div className="col-span-12 mt-20 lg:mx-24 py-8 mb-10 bg-[#D9D9D9]">
          <Blockquote className="text-3xl not-italic text-center font-bold">
            Sponsers
          </Blockquote>
        </div> */}
      </div>
    </>
  );
};
export default Offer;
