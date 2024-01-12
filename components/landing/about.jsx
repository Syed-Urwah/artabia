"use client";
import { Blockquote } from "flowbite-react";
const About = () => {
  return (
    <>
      <div className="color_home mt-0.5 ">
        <div className="grid grid-cols-12 mx-2">
          <div className="col-span-12 mt-16 text-center">
            <Blockquote className="text-lg not-italic font-bold">
              ABOUT ARTABIA
            </Blockquote>
            {/* <h2 className="text-4xl font-bold mb-3">ABOUT ARTABIA</h2> */}
            <p className="text-lg font-semibold">
              Explore the history and mission behind Artabia's artistic journey.
            </p>
          </div>

          <div className="box col-span-12 lg:col-span-6 md:col-span-6 flex flex-col justify-center items-start lg:ml-20">
            <h2 className="text-3xl font-bold mb-3">
              Artabia: Where Art Flourishes
            </h2>

            <p className="text-sm font-bold italic mb-3">
              Welcome to Artabia, a platform that transcends artistic
              boundaries, uniting talented creators in paintings and sculptures.
            </p>

            <p className="text-sm font-normal mb-3">
              Based in Saudi Arabia, Artabia extends its reach to the UAE and
              Jordan, fostering a vibrant community where tradition and
              innovation converge.
            </p>

            <p className="text-sm font-normal mb-3">
              At Artabia, we celebrate the richness of Middle Eastern artistry—a
              captivating intersection of cultures through brush strokes and
              sculpted forms.
            </p>

            <p className="text-sm font-normal mb-3">
              For artists seeking to elevate their craft and connect with
              discerning connoisseurs, Artabia offers a sophisticated and
              user-friendly environment.Our commitment to the end user
              experience is paramount, ensuring seamless navigation through a
              curated collection of extraordinary paintings and sculptures.
              Artabia is more than a marketplace; it's a curated gallery where
              each creation tells a unique story.
            </p>

            {/* Additional content can be added here, such as a timeline or additional information */}
          </div>

          <div className="box col-span-12 lg:col-span-6 md:col-span-6 mt-12 flex flex-col items-center mb-20">
            <img
              src="/img/offerp.png"
              className="w-full lg:w-[555px] h-auto mx-auto"
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
