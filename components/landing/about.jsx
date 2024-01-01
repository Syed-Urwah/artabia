'use client';
import { Blockquote } from "flowbite-react";
const About = () => {
  return (
    <>
      <div className="color_home mt-0.5 ">
        <div className="grid grid-cols-12 ">
          <div className="col-span-12 mt-16 text-center">
            <Blockquote className="text-lg not-italic font-bold">
              ABOUT COMPANY
            </Blockquote>
            <Blockquote className="text-sm not-italic font-semibold">
              SOME HISTORY
            </Blockquote>
          </div>
          <div className=" box col-span-12 ml-5 mt-10 flex flex-col justify-center items-start lg:col-span-6  lg:ml-32 lg:-mt-6 md:col-span-6 ">
            <Blockquote className="text-sm not-italic font-bold">
              2020
            </Blockquote>
            <p className="font-normal mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              condimentum sem ut mollis rhoncus. Aliquam tristique congue tortor
              commodo dignissim. Phasellus pulvinar ullamcorper mauris, sed
              vehicula est dignissim non.{" "}
            </p>
            <Blockquote className="text-sm not-italic font-bold mt-8">
              2020
            </Blockquote>
            <p className="font-normal mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              condimentum sem ut mollis rhoncus. Aliquam tristique congue tortor
              commodo dignissim. Phasellus pulvinar ullamcorper mauris, sed
              vehicula est dignissim non.{" "}
            </p>

            <button
              style={{ border: "2px solid #F1C4D9", color: "black" }}
              className="px-4 py-1 mt-8 rounded-full"
            >
              Read More
            </button>
          </div>
          <div className="box col-span-12  lg:col-span-6 md:col-span-6 mt-12 flex flex-col items-center  mb-20">
            <img
              src="/img/offerp.png"
              className="w-[355px] mx-2 h-[333px] lg:h-[383px] lg:w-[555px]"
              alt="Search"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
