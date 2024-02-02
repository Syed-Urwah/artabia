"use client";
import { Footer } from "flowbite-react";
import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";
import { FormattedMessage, useIntl } from "react-intl";

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
            <div className="  flex-col  hidden lg:block md:hidden gap-1 mt-4  ">
              {/* <img
                src="/img/artibia_logo.png"
                className="w-[155px] h-[40px] ml-14"
                alt="Search"
              /> */}
              <p className=" font-normal  text-center">
                <FormattedMessage
                  id="Be the first to know about exclusive deals and join the collective."
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </p>
            </div>
          </div>

          <div className="box col-span-12 flex flex-row justify-center lg:col-span-6 md:col-span-6">
            <div className="flex justify-center mt-8 mx-1 lg:mx-8">
              <div className="flex flex-col gap-2">
                <h5 className="text-[18px] font-bold ">
                  <FormattedMessage
                    id="FOR CLIENT"
                    values={{ b: (info) => <b>{info}</b> }}
                  />
                </h5>
                <p className="font-normal">
                  <FormattedMessage
                    id="Curated Excellence"
                    values={{ b: (info) => <b>{info}</b> }}
                  />
                </p>
                <p className="font-normal">
                  <FormattedMessage
                    id="Unique Artworks"
                    values={{ b: (info) => <b>{info}</b> }}
                  />
                </p>
                <p className="font-normal">
                  <FormattedMessage
                    id="Client-Friendly"
                    values={{ b: (info) => <b>{info}</b> }}
                  />
                </p>
                <p className="font-normal">
                  <FormattedMessage
                    id="Tailored Experience"
                    values={{ b: (info) => <b>{info}</b> }}
                  />
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-1 mt-8 mx-1 lg:mx-8">
              <div className="flex flex-col gap-2">
                <h5 className="text-[18px] font-bold ">
                  <FormattedMessage
                    id="FOR ARTISTS"
                    values={{ b: (info) => <b>{info}</b> }}
                  />
                </h5>
                <p className="font-normal">
                  <FormattedMessage
                    id="Showcase Brilliance"
                    values={{ b: (info) => <b>{info}</b> }}
                  />
                </p>
                <p className="font-normal">
                  <FormattedMessage
                    id="Connect & Elevate"
                    values={{ b: (info) => <b>{info}</b> }}
                  />
                </p>
                <p className="font-normal">
                  <FormattedMessage
                    id="Opportunities"
                    values={{ b: (info) => <b>{info}</b> }}
                  />
                </p>
                <p className="font-normal">
                  <FormattedMessage
                    id="Global Exposure"
                    values={{ b: (info) => <b>{info}</b> }}
                  />
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-1 mt-8 mx-1 lg:mx-8">
              <div className="flex flex-col gap-2">
                <h5 className="text-[18px] font-bold ">
                  <FormattedMessage
                    id="ABOUT US"
                    values={{ b: (info) => <b>{info}</b> }}
                  />
                </h5>
                <p className="font-normal">
                  <FormattedMessage
                    id="Artistic Convergence"
                    values={{ b: (info) => <b>{info}</b> }}
                  />
                </p>
                <p className="font-normal">
                  <FormattedMessage
                    id="Connect"
                    values={{ b: (info) => <b>{info}</b> }}
                  />{" "}
                </p>
                <p className="font-normal">
                  <FormattedMessage
                    id="Commitment"
                    values={{ b: (info) => <b>{info}</b> }}
                  />
                </p>
                <p className="font-normal">
                  <FormattedMessage
                    id="Passion"
                    values={{ b: (info) => <b>{info}</b> }}
                  />{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="box col-span-12 lg:col-span-3 md:col-span-3">
            <div className="mt-8 ">
              <h5 className="text-[18px] font-bold ">
                <FormattedMessage
                  id="FOLLOW US"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </h5>

              <div className="mt-2 flex row  gap-3 ">
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
