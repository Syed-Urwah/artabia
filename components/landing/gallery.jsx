"use client";

import Link from "next/link";
import { Rating } from "flowbite-react";
import { Blockquote } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getArtworks = async () => {
      try {
        let response;
        if (searchTerm) {
          response = await axios.post("http://admin.artabiasa.com/api/search", {
            use_s_text: searchTerm,
            api_password: process.env.REACT_APP_API_PASSWORD,
          });
        } else {
          response = await axios.post(
            "http://admin.artabiasa.com/api/get-random-products-home",
            {
              api_password: process.env.REACT_APP_API_PASSWORD,
            }
          );
        }
        console.log("Artworks Product ->", response.data.data);
        setArtworks(response.data.data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };
    getArtworks();
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div id="search" className="bg-gray-300 h-0.5 w-full mt-3"></div>
      <div className="grid grid-cols-12 text-center lg:mx-auto mb-14">
        <div className="col-span-12 mt-16">
          <Blockquote className="text-lg not-italic font-bold">
            THE LATEST
          </Blockquote>
          <Blockquote className="text-sm not-italic font-semibold">
            IN OUR ART GALLERY
          </Blockquote>
        </div>
        <div className="col-span-12 mt-5 flex justify-center">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className=" h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
              />
            </svg>
          </div>
          <input
            onChange={handleSearch}
            type="text"
            id="simple-search"
            className="w-[350px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search "
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-10 gap-y-8 mx-4 lg:mx-36 ">
        {artworks.map((artwork, index) => (
          <div
            key={index}
            className="box col-span-5 lg:col-span-2 md:col-span-2 lg:ml-8"
          >
            <Link href={`/product/${artwork.artw_pk}`}>
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
              <h5 className="text-1xl font-bold">
                By:{artwork.owner_id.pers_etext}
              </h5>
              <p className="text-gray-600 text-sm font-semibold">{`${artwork.artw_width} X  ${artwork.artw_length} cm`}</p>
              <p className="text-gray-600 text-sm font-semibold">{`${artwork.artw_price} SAR`}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="col-span-12  mt-8 flex  justify-center lg:py-1 mb-8">
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
        </div>
      </div>
    </>
  );
};

export default Gallery;
