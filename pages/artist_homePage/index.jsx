"use client";

import Layout from "@/components/layout/layout";
import { Blockquote } from "flowbite-react";
import Link from "next/link";
import { Rating } from "flowbite-react";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { getPayload } from "../enviroment/auth";
import { useRouter } from "next/router";
const HomePage = () => {
  const router = useRouter();
  const [artworks, setArtworks] = useState([]);
  useLayoutEffect(() => {
    const payload = getPayload();

    if (!payload) {
      router.push("/login");
      return;
    }
  }, [])

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

  // explore work
  const [categories, setCategories] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.post(
          "http://admin.artabiasa.com/api/get-categories",
          {
            api_password:
              "mVtRqwedl8sMNMgyUsadls7uigOdU234Ru1Kvi0Jljafe2232dnfsdfl5",
          }
        );
        console.log("Subcategories =>", data);
        if (data.status === "true") {
          setCategories(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const handleNext = () => {
    setStartIndex(startIndex + itemsPerPage);
  };

  const handleBack = () => {
    setStartIndex(Math.max(0, startIndex - itemsPerPage));
  };

  const visibleCategories = categories.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <Layout>
      {/* Hero */}
      <div
        className="mt-0.5"
        style={{
          backgroundImage: "url('/img/artistHome.png')",
          backgroundSize: "cover",
        }}
      >
        <div className="grid grid-cols-12">
          <div className="box col-span-12 ml-5 mt-10 w-2/2 h-80 align-middle flex flex-col lg:col-span-6 lg:ml-16 md:col-span-6 lg:mt-32 lg:mb-28">
            <h2 className="text-5xl text-white">
              CUSTOMERS FROM ALL OVER THE WORLD
            </h2>

            <button
              style={{ background: "white", color: "#d25fbb" }}
              className="px-4 py-2 text-2xl  mt-10 rounded-full w-2/5"
            >
              Sell your Art
            </button>
          </div>
        </div>
      </div>

      {/* Offer */}
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
            Sell Art
          </button>
        </div>
        <div className="box col-span-6 flex justify-center lg:justify-center lg:col-span-2 md:col-span-2">
          <button
            style={{ background: "#F1C4D9", color: "black" }}
            className=" px-5 py-2 mt-14 rounded-full "
          >
            Rent Out
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

        <div className="col-span-12 mt-20 lg:mt-36 lg:mx-24 py-8 mb-16 bg-[#D9D9D9]">
          <Blockquote className="text-3xl not-italic text-center font-bold">
            Sponsers
          </Blockquote>
        </div>
      </div>

      {/* about company */}
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
     
      {/*Explore */}
      <div className="grid grid-cols-12  lg:mx-auto ">
        <div className="box col-span-12 text-center lg:ml-[85px]  mt-16 lg:text-left mb-10">
          <Blockquote className="text-lg not-italic font-bold">
            EXPLORE
          </Blockquote>
          <Blockquote className="text-sm not-italic font-semibold">
            UNIQUE NEW ART COLLECTIONS
          </Blockquote>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-y-4 lg:mx-10 lg:mb-24 relative">
        {visibleCategories.map((category, index) => (
          <div
            className="box col-span-12 lg:col-span-4 md:col-span-4"
            key={index}
          >
            <img
              src={`http://admin.artabiasa.com/storage/${category.cat_image}`}
              className="w-[355px] h-[333px] mx-auto"
              alt="Search"
            />

            <div className="flex  flex-col justify-center gap-4 mt-4">
              <h5 className="text-2xl text-center tracking-tight dark:text-white">
                {category.cat_etext}
              </h5>
              <Link
                href={`/sub_category/${
                  category.cat_pk
                }?catData=${encodeURIComponent(JSON.stringify(category))}`}
                passHref
              >
                <button
                  style={{ border: "2px solid #F1C4D9", color: "black" }}
                  className="px-6 py-1 mt-3 mx-32 rounded-full lg:mx-48"
                >
                  EXPLORE
                </button>
              </Link>
            </div>
          </div>
        ))}
        {startIndex > 0 && (
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-black "
            onClick={handleBack}
            style={{
              backgroundColor: "#F1C4D9",
              padding: "10px",
              borderRadius: "50%",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            <FaArrowLeft size={30} />
          </div>
        )}
        {startIndex + itemsPerPage < categories.length && (
          <div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-black"
            onClick={handleNext}
            style={{
              backgroundColor: "#F1C4D9",
              padding: "10px",
              borderRadius: "50%",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            <FaArrowRight size={30} />
          </div>
        )}
      </div>

       {/* Art network */}

       <div className="grid grid-cols-12 text-center lg:mx-auto mb-14">
        <div className="col-span-12 mt-16">
          <Blockquote className="text-lg not-italic font-bold">
            THE ART NETWORK
          </Blockquote>
          <Blockquote className="text-sm not-italic font-semibold">
            OUR COMMUNITY
          </Blockquote>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-y-8 mx-4 lg:mx-36 mb-24">
        {artworks.map((artwork, index) => (
          <div
            key={index}
            className="box col-span-5 lg:col-span-2 md:col-span-2 lg:ml-8"
          >
            <Link href={`/product/${artwork.artw_pk}`}>
              <img
                src={"/img/artist.png"}
                className="w-[155px] h-[156px] mx-auto"
                alt="Artwork"
              />
            </Link>

            <div className="flex flex-col text-center gap-1 mt-1">
              <h5 className="text-1xl font-bold">Harry Byrne</h5>
              <p className="text-gray-500 text-[13px]  font-semibold">ARTIST</p>
              <p className="text-gray-500 text-[13px] font-semibold">
                Perth • Australia
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="col-span-12  lg:mt-3 flex  justify-center  lg:mb-20 mb-4">
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
    </Layout>
  );
};

export default HomePage;
