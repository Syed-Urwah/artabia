"use client";
import { Rating } from "flowbite-react";

import { Blockquote } from "flowbite-react";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiOutlineQuestionMarkCircle,
  HiOutlineShoppingCart,
  HiPlus,
  HiX,
} from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";
import { getLocalToken, getPayload } from "@/enviroment/auth";
import axios from "axios";
import { FormattedMessage, useIntl } from "react-intl";

function ProductView({ artwork }) {
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

  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handelAddToCart = async () => {
    getPayload();
    if (!getPayload()) {
      router.push("/login");
      return;
    }
    setIsAddingToCart(true);
    setOpenModal(true);

    try {
      const { data } = await axios.post(
        "http://admin.artabiasa.com/api/add-to-cart",
        {
          user_id: getPayload(),
          artwork_id: artwork.artw_pk,
          api_password: process.env.REACT_APP_API_PASSWORD,
        },
        {
          headers: {
            Authorization: "Bearer " + getLocalToken(),
          },
        }
      );
      setIsAddingToCart(false);
      console.log("Add to cart ->", data);
      console.log(data);
      if (data.status === "true") {
        setAddedToCart(true);
        setOpenModal(true);
        // router.push('/cart');
      } else if (data.status === "false_exist") {
        setErrors([data.error]);
        setOpenModal(true);

        // router.push('/cart')
      } else if (data.status == "false_artist") {
        setErrors([data.error]);
        setOpenModal(true);
        console.log("noor hire");
        // router.push('/cart')
      } else if (data.status == "false_exist_owner") {
        setErrors([data.error]);
        setOpenModal(true);
        console.log("noor hire");
        // router.push('/cart')
      }
    } catch (error) {
      console.log(error);
      setIsAddingToCart(false);
    }
  };

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
  const [artimg, setartimg] = useState({});

  const handleImageClick = (imageSrc) => {
    console.log("img->>>>", imageSrc);
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
            <h5 className="text-2xl font-bold">{artwork.artw_atext}</h5>
            <h3 className="text-gray-600 text-sm font-bold mb-2">
              <FormattedMessage
                id="By"
                values={{ b: (info) => <b>{info}</b> }}
              />{" "}
              : {artwork.user_id.pers_etext}
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
              />{" "}
              : {artwork.artw_weight}
            </p>
            <p className="text-gray-600 text-sm font-semibold">
              <FormattedMessage
                id="Material"
                values={{ b: (info) => <b>{info}</b> }}
              />{" "}
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

                <Button
                  style={{ position: "relative", zIndex: 1 }}
                  onClick={handelAddToCart}
                  className="bg-[#f19ec5] rounded-full text-black"
                >
                  <HiOutlineShoppingCart className="mr-1 h-5 w-7 " />

                  <FormattedMessage
                    id="Add to cart"
                    values={{ b: (info) => <b>{info}</b> }}
                  />
                </Button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                  <Modal.Header
                    style={{
                      border: 0,
                      backgroundImage: 'url("/img/layer_1.png")',
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="grid grid-cols-12  mt-7">
                      <div className="box col-span-12 flex justify-center lg:col-span-6 md:col-span-6">
                        <div className="flex items-center">
                          {errors && errors.length === 0
                            ? "Product has been successfully added to the cart"
                            : errors}
                        </div>
                      </div>
                      <div className="box col-span-12 flex justify-center lg:col-span-6 md:col-span-6 ">
                        <div className="flex items-center justify-between">
                          <img
                            src={mainImage}
                            className="w-[75px] h-[75px]  rounded-md mx-auto mb-2"
                            alt="Search"
                          />
                          <div className="ml-2 flex flex-col">
                            <h3 className="text-gray-600 text-sm font-bold mb-2">
                              <FormattedMessage
                                id="By"
                                values={{ b: (info) => <b>{info}</b> }}
                              />{" "}
                              {artwork.user_id.pers_etext}
                            </h3>
                            <p className="text-gray-600 text-sm font-semibold">
                              {artwork.artw_price} SAR
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border-b-4 border-pink-200 mt-3 mb-2"></div>

                    <div className="flex flex-row items-center justify-around mt-4 mb-8">
                      <button
                        onClick={() => setOpenModal(false)}
                        style={{ background: "#C38EBF" }}
                        className="px-4 py-1  mr-1 lg:rounded-full text-black text-[16px]"
                      >
                        <FormattedMessage
                          id="Continue Shopping"
                          values={{ b: (info) => <b>{info}</b> }}
                        />
                      </button>

                      <Link
                        href={`${process.env.NEXT_PUBLIC_FRONT_END_URL}/customer/cart/${artwork.artw_pk}`}
                      >
                        <button
                          style={{ background: "#f19ec5" }}
                          className="px-4 py-1  lg:rounded-full text-black text-[16px]"
                        >
                          <FormattedMessage
                            id="Proceed to checkout"
                            values={{ b: (info) => <b>{info}</b> }}
                          />
                        </button>
                      </Link>
                    </div>
                  </Modal.Header>
                </Modal>
              </div>
            </div>
            <div className="flex flex-row items-center justify-end  pt-10 ">
              <Link href="/">
                <Button className="bg-white rounded-full text-black border-black">
                  <HiOutlineQuestionMarkCircle className="mr-1 h-5 w-7 " />

                  <FormattedMessage
                    id="Back to Homepage"
                    values={{ b: (info) => <b>{info}</b> }}
                  />
                </Button>
              </Link>
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

        <div className="box col-span-12 lg:col-span-6 md:col-span-6 w-full lg:mt-24 ">
          <div className="flex flex-col text-left gap-1 lg:mx-16 lg:ml-16 mr-18">
            <div className="box bg-[#F0F0F0] pt-4 mt-4  rounded-md">
              <div className="flex flex-row items-center justify-between px-8 mb-5 ">
                <Blockquote className="text-md not-italic font-semibold ">
                  <FormattedMessage
                    id="Authenticity"
                    values={{ b: (info) => <b>{info}</b> }}
                  />
                </Blockquote>
                <HiPlus className="font-bold" />
              </div>
              <div className="flex flex-row items-center justify-between px-8 mb-5 ">
                <Blockquote className="text-md not-italic font-semibold ">
                  <FormattedMessage
                    id="Shipping, Delivery"
                    values={{ b: (info) => <b>{info}</b> }}
                  />
                </Blockquote>
                <HiPlus className="font-bold" />
              </div>
              <div className="flex flex-row items-center justify-between px-8 mb-5 ">
                <Blockquote className="text-md not-italic font-semibold ">
                  <FormattedMessage
                    id="Artwork"
                    values={{ b: (info) => <b>{info}</b> }}
                  />
                </Blockquote>
                <HiPlus className="font-bold" />
              </div>
              <div className="flex flex-row items-center justify-between px-8 mb-5 ">
                <Blockquote className="text-md not-italic font-semibold ">
                  <FormattedMessage
                    id="Framing"
                    values={{ b: (info) => <b>{info}</b> }}
                  />
                </Blockquote>
                <HiPlus className="font-bold" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-300 h-0.5 w-full mt-3"></div>
      <div className="grid grid-cols-12 text-center lg:mx-auto mb-14">
        <div className="col-span-12 mt-16">
          <Blockquote className="text-lg not-italic font-bold">
            <FormattedMessage
              id="YOU MIGHT ALSO LIKE"
              values={{ b: (info) => <b>{info}</b> }}
            />
          </Blockquote>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-y-8 mx-4 lg:mx-32 mb-24">
        {artworks.map((artwork, index) =>
          index <= 2 ? (
            <div
              key={index}
              className="box col-span-6 lg:col-span-4 md:col-span-4"
            >
              <img
                src={
                  artwork.artw_cover_image
                    ? `http://admin.artabiasa.com/storage/${artwork.artw_cover_image}`
                    : ""
                }
                className="w-[155px] h-[156px]  lg:mx-auto"
                alt="Search"
              />

              <div class="flex  flex-col text-center gap-1 mt-1">
                <h5 className="text-1xl font-bold ">
                  {artwork.owner_id.pers_etext}
                </h5>
                <p className="text-gray-600 text-sm font-semibold">{`${artwork.artw_width} X  ${artwork.artw_length} cm`}</p>
                <p className="text-gray-600 text-sm font-semibold">
                  {`${artwork.artw_price} SAR`}
                </p>
              </div>
            </div>
          ) : null
        )}
      </div>

      <div className="col-span-12  lg:mt-20 flex  justify-center lg:py-8 mb-4">
        <div className=" flex-col">
          <img src="/img/google.png" className="w-[200px]   " alt="Search" />
          <Rating>
            <p className="mb-2 mr-2 text-2xl font-semibold  dark:text-gray-400">
              <FormattedMessage
                id="Reviews"
                values={{ b: (info) => <b>{info}</b> }}
              />
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
            <FormattedMessage
              id="See all reviews"
              values={{ b: (info) => <b>{info}</b> }}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductView;
