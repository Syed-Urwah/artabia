'use client';

import { Blockquote } from "flowbite-react";

const Offer = () => {
  return (
    <>
      <div className="grid grid-cols-12 text-center lg:mx-auto">
        <div className="col-span-12 mt-16">
          <Blockquote className="text-lg not-italic font-bold">
            WHAT ARTABIA OFFERS
          </Blockquote>
          <Blockquote className="text-sm not-italic font-semibold">
            OFFERS
          </Blockquote>
        </div>

        <div className="box col-span-6 flex justify-center  lg:justify-end lg:col-span-4 md:col-span-4">
          <button
            style={{ background: "#F1C4D9", color: "black" }}
            className=" px-5 py-2 mt-14 rounded-full  "
          >
            Purchase Art
          </button>
        </div>
        <div className="box col-span-6 flex justify-center lg:justify-center lg:col-span-2 md:col-span-2">
          <button
            style={{ background: "#F1C4D9", color: "black" }}
            className=" px-5 py-2 mt-14 rounded-full "
          >
            Rent It
          </button>
        </div>
        <div className="box col-span-6 flex justify-center lg:justify-start lg:col-span-2 md:col-span-3">
          <button
            style={{ background: "#F1C4D9", color: "black" }}
            className=" px-5 py-2 mt-14 rounded-full "
          >
            Clients Consultancy
          </button>
        </div>
        <div className="box col-span-6 flex justify-center lg:justify-start lg:col-span-2 md:col-span-3">
          <button
            style={{ background: "#F1C4D9", color: "black" }}
            className=" px-5 py-2 mt-14 rounded-full "
          >
            Art on Comission
          </button>
        </div>

        <div className="col-span-12 mt-20 lg:mx-24 py-8 mb-10 bg-[#D9D9D9]">
          <Blockquote className="text-3xl not-italic text-center font-bold">
            Sponsers
          </Blockquote>
        </div>
      </div>
    </>
  );
};
export default Offer;
