"use client";

import Link from "next/link";
import { Rating } from "flowbite-react";
import { Blockquote } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const getArtworks = async () => {
      try {
        const { data } = await axios.post(
          "http://admin.artabiasa.com/api/get-random-products-home",
          {
            api_password: process.env.REACT_APP_API_PASSWORD,
          }
        );
        console.log("artworks Product ->", data.data);

        setArtworks(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getArtworks();
  }, []);

  return (
    <>
      <div className="bg-gray-300 h-0.5 w-full mt-3"></div>
      <div className="grid grid-cols-12 text-center lg:mx-auto mb-14">
        <div className="col-span-12 mt-16">
          <Blockquote className="text-lg not-italic font-bold">
            THE LATEST
          </Blockquote>
          <Blockquote className="text-sm not-italic font-semibold">
            IN OUR ART GALLERY
          </Blockquote>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-y-8 mx-4 lg:mx-36 mb-24">
        {artworks.map((artwork, index) => (
          <div
            key={index}
            className="box col-span-5 lg:col-span-2 md:col-span-2 lg:ml-8"
          >
            <Link href={`/product/${artwork.artw_pk}`} >
                <img
                  src={
                    artwork.artw_cover_image
                      ? `http://admin.artabiasa.com/storage/${artwork.artw_cover_image}`
                      : ""
                  }
                  className="w-[155px] h-[156px]"
                  alt="Artwork"
                />
            </Link>

            <div className="flex flex-col text-left gap-1 mt-1">
            <h5 className="text-1xl font-bold">{artwork.artw_atext}</h5>
              <h5 className="text-1xl font-bold">By:{artwork.owner_id.pers_etext}</h5>
              <p className="text-gray-600 text-sm font-semibold">{`${artwork.artw_width} X  ${artwork.artw_length} cm`}</p>
              <p className="text-gray-600 text-sm font-semibold">{`${artwork.artw_price} SAR`}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="col-span-12  lg:mt-20 flex  justify-center lg:py-8 mb-4">
        <div className=" flex-col">
          <img src="/img/google.png" className="w-[200px]   " alt="Search" />
          <Rating>
            <p className="mb-2 mr-2 text-2xl font-semibold  dark:text-gray-400">
              Reviews
            </p>
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
            <Rating.Star />
          </Rating>
          <button
            style={{ border: "2px solid #F1C4D9", color: "black" }}
            className="px-5 py-1 mx-6 rounded-full "
          >
            See all reviews
          </button>
        </div>
      </div>
    </>
  );
};

export default Gallery;
