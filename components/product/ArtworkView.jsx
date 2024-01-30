"use client";

import { Blockquote } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiX,
} from "react-icons/hi";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

function ArtworkView({ artwork }) {

  const router = useRouter();



  const [zoomedImage, setZoomedImage] = useState(null);

  const handleZoom = (imageSrc) => {
    setZoomedImage(imageSrc);
  };

  const handleZoomOut = () => {
    setZoomedImage(null);
  };

  const [mainImage, setMainImage] = useState(
    `http://admin.artabiasa.com/storage/${artwork.artw_cover_image}`
  );

  const handleImageClick = (imageSrc) => {
    setMainImage(imageSrc);

  };

  return (
    <>
      <div className="grid grid-cols-12 mx-3 lg:mx-36 mb-12 mt-12 ">
        <div className="box col-span-12 flex justify-center lg:col-span-6 md:col-span-6">
          <div className="flex flex-col">
            {/* Main image */}
            <img
              src={mainImage}
              className="w-[455px] h-[433px] lg:mx-auto cursor-pointer"
              alt="Cover Image"
              onClick={() => handleZoom(mainImage)}
            />

            {/* Additional images */}
            <div className="flex flex-row text-center gap-1 mt-3 ml-3">
              {artwork.images.map((artimg, index) => (
                <img
                  key={index}
                  src={`http://admin.artabiasa.com/storage/${artimg.img}`}
                  className="w-[75px] h-[75px] border transition-all duration-300 border-gray-300 hover:border-yellow-500 hover:scale-105 hover:shadow-md cursor-pointer"
                  alt={`Image ${index + 1}`}
                  onClick={() =>
                    handleImageClick(
                      `http://admin.artabiasa.com/storage/${artimg.img}`
                    )
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {zoomedImage && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
            <img
              src={zoomedImage}
              className="max-w-full max-h-full cursor-pointer"
              style={{ width: "70%", height: "90%" }}
              alt="Zoomed Image"
              onClick={handleZoomOut}
            />
            <HiX
              className="absolute top-4 right-28 text-white cursor-pointer"
              size={24}
              onClick={handleZoomOut}
            />
          </div>
        )}

        <div className="box col-span-12 lg:col-span-6 md:col-span-6 w-full ">
          <div className="flex flex-col text-left gap-1 mt-16 lg:ml-16 mr-18">
            <h5 className="text-2xl font-bold">THAT ANIMAL LOVE</h5>
            <h3 className="text-gray-600 text-sm font-bold mb-2">
              <FormattedMessage
                id="BY"
                values={{ b: (info) => <b>{info}</b> }}
              />
              {artwork.user_id.pers_etext}
            </h3>
            <p className="text-gray-600 text-sm font-semibold">
              <FormattedMessage
                id="Size"
                values={{ b: (info) => <b>{info}</b> }}
              />
              : {`${artwork.artw_width} X  ${artwork.artw_length} cm`}
            </p>
            <p className="text-gray-600 text-sm font-semibold">
            <FormattedMessage
                id="Weight"
                values={{ b: (info) => <b>{info}</b> }}
              />
               : {artwork.artw_weight}
            </p>
            <p className="text-gray-600 text-sm font-semibold">
            <FormattedMessage
                id="Material"
                values={{ b: (info) => <b>{info}</b> }}
              />
               : {artwork.material_fk.matr_etext}
            </p>

            <div className="box bg-[#F0F0F0] pt-2 mt-4 rounded-md">
              <div className="flex flex-row items-center px-4 ">
                <Blockquote className="text-md not-italic font-semibold text-gray-600">
                <FormattedMessage
                id="Artist"
                values={{ b: (info) => <b>{info}</b> }}
              />
                  :{" "}
                </Blockquote>
                <Blockquote className="text-sm not-italic font-semibold ml-1">
                  {artwork.user_id.pers_etext}
                </Blockquote>
              </div>
              <div className="flex flex-row items-center justify-between px-4 ">
                <Blockquote className="text-sm not-italic font-normal text-gray-600">
                <FormattedMessage
                id="Availability"
                values={{ b: (info) => <b>{info}</b> }}
              />
                  :
                </Blockquote>
                <Blockquote className="text-sm not-italic font-semibold text-[#F21079]">
                <FormattedMessage
                id="In Stock"
                values={{ b: (info) => <b>{info}</b> }}
              />
                  
                </Blockquote>
              </div>
              <div className="bg-gray-300 h-0.5 w-full mt-2"></div>

              <div className="flex flex-row items-center justify-between px-2 py-3 ">
                <Blockquote className="text-2xl not-italic font-bold ">
                  {artwork.artw_price} SAR
                </Blockquote>
              </div>
            </div>
          </div>
        </div>

        <div className="box col-span-12 flex justify-center lg:col-span-6 md:col-span-6 mt-10 lg:mt-24">
          <div className="flex  flex-col mx-2 ">
            <img
              src={
                artwork.artw_cover_image
                  ? `http://admin.artabiasa.com/storage/${artwork.artw_cover_image}`
                  : ""
              }
              className="w-[75px] h-[75px]  mx-auto mb-2"
              alt="Search"
            />
            <p className="text-gray-600 text-md font-normal text-justify lg:mx-10">
              {artwork.artw_description_en}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtworkView;
