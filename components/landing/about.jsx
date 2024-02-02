"use client";
import { FormattedMessage, useIntl } from "react-intl";
import { Blockquote } from "flowbite-react";
const About = () => {
  return (
    <>
      <div className="color_home mt-0.5 ">
        <div className="grid grid-cols-12 mx-2 lg:pb-20">
          <div className="col-span-12 mt-16 text-center lg:mb-14">
            <Blockquote className="text-lg not-italic font-bold">
              <FormattedMessage
                id="ABOUT ARTABIA"
                values={{ b: (info) => <b>{info}</b> }}
              />
            </Blockquote>
            {/* <h2 className="text-4xl font-bold mb-3">ABOUT ARTABIA</h2> */}
            <p className="text-lg font-semibold">
              <FormattedMessage
                id="Explore the history and mission behind Artabia's artistic journey."
                values={{ b: (info) => <b>{info}</b> }}
              />
            </p>
          </div>

          <div className="box col-span-12 flex justify-center items-center  lg:col-span-6 md:col-span-6 ">
            <div className="flex flex-col mx-2 lg:mx-20 ">
              <h2 className="text-3xl font-bold mb-3">
                <FormattedMessage
                  id="Artabia: Where Art Flourishes"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </h2>

              <p className="text-sm font-bold italic mb-3">
                <FormattedMessage
                  id="Welcome to Artabia, a platform that transcends artistic boundaries, uniting talented creators in paintings and sculptures."
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </p>

              <p className="text-sm font-normal mb-3">
                <FormattedMessage
                  id="Based in Saudi Arabia, Artabia extends its reach to the UAE and Jordan, fostering a vibrant community where tradition and innovation converge."
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </p>

              <p className="text-sm font-normal mb-3">
                <FormattedMessage
                  id="At Artabia, we celebrate the richness of Middle Eastern artistry—a captivating intersection of cultures through brush strokes and sculpted forms."
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </p>

              <p className="text-sm font-normal mb-3">
                .
                <FormattedMessage
                  id="Forartists"
                  values={{ b: (info) => <b>{info}</b> }}
                />
              </p>

              {/* Additional content can be added here, such as a timeline or additional information */}
            </div>
          </div>

          <div className="box col-span-12 lg:col-span-6 md:col-span-6  flex  items-center  ">
            <img
              src="/img/offerp.png"
              className=" lg:w-[500px] h-auto mx-auto"
              alt="Artabia Offer"
            />
          </div>
        </div>

        {/* <div className="grid grid-cols-12 ">
          <div className="col-span-12 mt-16 text-center">
            <Blockquote className="text-lg not-italic font-bold">
              ABOUT COMPANY
            </Blockquote>
            <Blockquote className="text-sm not-italic font-semibold">
              SOME HISTORY
            </Blockquote>
          </div>
          <div className="box col-span-12 ml-5 mt-10 flex flex-col justify-center items-start lg:col-span-6 lg:ml-32 lg:-mt-6 md:col-span-6">
            <h2 className="text-3xl font-bold mb-3">Artabia</h2>

            <p className="text-sm font-bold italic mb-3">
              Welcome to Artabia, a platform that transcends artistic
              boundaries, uniting talented creators in paintings and sculptures.
              Based in Saudi Arabia, Artabia extends its reach to the UAE and
              Jordan, fostering a vibrant community.
            </p>

            <p className="text-sm font-normal mb-3">
              At Artabia, we celebrate the fusion of tradition and innovation,
              providing a virtual haven for artists to showcase their
              masterpieces globally. Our platform is a testament to the richness
              of Middle Eastern artistry, a captivating intersection of cultures
              through brush strokes and sculpted forms.
            </p>

            <p className="text-sm font-normal mb-3">
              For artists seeking to elevate their craft and connect with
              discerning connoisseurs, Artabia offers a sophisticated and
              user-friendly environment.
            </p>

            Additional content can be added here, such as a timeline or additional information

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
        </div> */}
      </div>
    </>
  );
};

export default About;
