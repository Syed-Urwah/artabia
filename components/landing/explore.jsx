"use client";
import axios from "axios";
import { Blockquote } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";

const Explore = () => {
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
    <>
      <div id="exploreSection" className="grid grid-cols-12  lg:mx-auto ">
        <div className="box col-span-12 text-center lg:ml-[85px]  mt-16 lg:text-left mb-10">
          <Blockquote className="text-lg not-italic font-bold">
            
            <FormattedMessage
              id="EXPLORE"
              values={{ b: (info) => <b>{info}</b> }}
            />
          </Blockquote>
          <Blockquote className="text-sm not-italic font-semibold">
            
            <FormattedMessage
              id="UNIQUE NEW ART COLLECTIONS"
              values={{ b: (info) => <b>{info}</b> }}
            />
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
                  className="px-6 py-1 mt-3 mx-32 rounded-full lg:mx-auto flex justify-center"
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
    </>
  );
};

export default Explore;
