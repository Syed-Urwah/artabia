"use client";
import { FormattedMessage, useIntl } from "react-intl";
const Hero = () => {
  return (
    <>
      <div className="color_home mt-0.5">
        <div className="grid grid-cols-12 ">
          <div className=" box col-span-12   flex  justify-center  lg:col-span-6    md:col-span-6 ">
            <div className=" flex flex-col mx-2 mt-10 lg:mt-32">
              <h2 className=" text-3xl lg:w-[590px]">
                <FormattedMessage
                  id="Contemporary Art Middle East: Vibrant Perspectives."
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </h2>

              <a
                href="#exploreSection"
                style={{ background: "#C38EBF", color: "black" }}
                className="px-4 py-1 mt-8 rounded-full w-[190px]"
              >
                <FormattedMessage
                  id="Explore Collections"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </a>
            </div>
          </div>
          <div className="box col-span-12 lg:col-span-6 md:col-span-6 mt-12 flex flex-col items-center  mb-14">
            <img
              src="/img/first.png"
              className="mr-2 h-[333px] w-[332px]"
              alt="Search"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
