"use client";
import { Footer } from "flowbite-react";
import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";

function Footerr() {
  const iconColor = "#8C0D81";
  const searchBarBorderColor = "#8C0D81";
  const BorderColor = "#ed99c0";

  return (
    <Footer container className="bg-[#F4C7DC] rounded-none">
      <div className="w-full">
        <div className="grid grid-cols-12 ">
          <div className="box col-span-12 lg:col-span-3 md:col-span-3 lg:ml-8">
            <img
              src="/img/artibia_logo.png"
              className="w-[255px] h-[70px] lg:mx-5  mt-4"
              alt="Search"
            />
            {/* <div className="flex  flex-col justify-left lg:ml-8 gap-2 lg:mt-20 ">
              <h5 className="text-1xl font-semibold text-left">Contact Us</h5>
              <h5 className="text-1xl font-semibold text-left ">
                Terms & Conditions
              </h5>
              <h5 className="text-1xl font-semibold text-left ">
                Account Setting
              </h5>
            </div> */}
            <div className="  flex-col justify-left hidden lg:block md:hidden gap-1 mt-14  ">
              <img
                src="/img/artibia_logo.png"
                className="w-[155px] h-[40px] ml-14"
                alt="Search"
              />
              <p className=" font-normal mr-10 text-center">
                Be the first to know about exclusive deals and join the
                collective.
              </p>
            </div>
          </div>

          <div className="box col-span-12 flex flex-row justify-center lg:col-span-6 md:col-span-6">
            <div className="flex justify-center mt-8 mx-1 lg:mx-8">
              <div className="flex flex-col gap-2">
                <h5 className="text-[18px] font-bold text-left">FOR CLIENT</h5>
                <p className="font-normal">Curated Excellence</p>
                <p className="font-normal">Unique Artworks</p>
                <p className="font-normal">Client-Friendly</p>
                <p className="font-normal">Tailored Experience</p>
              </div>
            </div>

            <div className="flex justify-center gap-1 mt-8 mx-1 lg:mx-8">
              <div className="flex flex-col gap-2">
                <h5 className="text-[18px] font-bold text-left">FOR ARTISTS</h5>
                <p className="font-normal">Showcase Brilliance</p>
                <p className="font-normal">Connect & Elevate</p>
                <p className="font-normal"> Opportunities</p>
                <p className="font-normal">Global Exposure</p>
              </div>
            </div>

            <div className="flex justify-center gap-1 mt-8 mx-1 lg:mx-8">
              <div className="flex flex-col gap-2">
                <h5 className="text-[18px] font-bold text-left">ABOUT US</h5>
                <p className="font-normal">Artistic Convergence</p>
                <p className="font-normal">Connect </p>
                <p className="font-normal">Commitment</p>
                <p className="font-normal">Passion </p>
              </div>
            </div>
          </div>

          <div className="box col-span-12 lg:col-span-3 md:col-span-3">
            <div className="mt-8 ">
              <h5 className="text-[18px] font-bold text-left lg:ml-14">
                FOLLOW US
              </h5>

              <div className="mt-2 flex space-x-4 lg:ml-12">
                <Footer.Icon
                  href="#"
                  icon={BsLinkedin}
                  style={{ color: iconColor }}
                />
                <Footer.Icon
                  href="#"
                  icon={BsInstagram}
                  style={{ color: iconColor }}
                />
                <Footer.Icon
                  href="#"
                  icon={BsYoutube}
                  style={{ color: iconColor }}
                />
                <Footer.Icon
                  href="#"
                  icon={BsFacebook}
                  style={{ color: iconColor }}
                />
              </div>
            </div>
          </div>
        </div>

        <Footer.Divider
          className="w-full mx-0 p-0"
          style={{ borderColor: BorderColor }}
        />
        <div className="w-full flex items-center justify-center">
          <Footer.Copyright by="Copyright 2023 ARTABIA. All rights reserved." />
        </div>
      </div>
    </Footer>
  );
}

export default Footerr;
