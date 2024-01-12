"use client";

import Layout from "@/components/layout/layout";
import { HiOutlineHeart, HiAdjustments, HiClipboardList } from "react-icons/hi";
import { Tabs } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  getLocalToken,
  getPayload,
  logout,
  userIsAuthenticated,
} from "@/enviroment/auth";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footerr from "@/components/layout/footer";

const Category = () => {
  const router = useRouter();
  const { catData } = router.query;
  const categoryData = catData ? JSON.parse(decodeURIComponent(catData)) : null;
  const { subcat_cat_fk } = router.query;
  // const params = useParams();

  const [cat_id, setCatID] = useState(null);
  const [subcat, setSubcat] = useState(null);
  const [isLoadingArtworks, setIsLoadingArtworks] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [products, setProducts] = useState(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isFavorite, setIsFavorite] = useState([]);

  const getSubCat = async (id) => {
    setIsLoadingArtworks(true);
    try {
      const { data } = await axios.post(
        "http://admin.artabiasa.com/api/get-sub-categories-by-id",
        {
          pers_fk: getPayload() && getPayload().sub,
          subcat_cat_fk: id,
          api_password: process.env.REACT_APP_API_PASSWORD,
        }
      );

      console.log(data);

      console.log("getSubCate ->", data.data.data);

      if (data.status === "true") {
        setSubcat(data.data.data);
        handleTabClick(0, data.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingArtworks(false);
    }
  };

  useEffect(() => {
    if (!subcat_cat_fk) {
      return;
    }
    getSubCat(subcat_cat_fk);
  }, [subcat_cat_fk]);

  const handleFavorite = async (artw_fk, index) => {
    getPayload();
    if (!getPayload()) {
      router.push("/login");
      return;
    }

    try {
      const isAlreadyFavorite = isFavorite[index];
      const { data } = await axios.post(
        "http://admin.artabiasa.com/api/add-to-favoraite",
        {
          pers_fk: getPayload() && getPayload().sub,
          artw_fk: artw_fk,
          api_password: process.env.REACT_APP_API_PASSWORD,
        },
        {
          headers: {
            Authorization: `Bearer ${getLocalToken()}`,
          },
        }
      );

      console.log("Favorite operation result ->", data);

      handleTabClick(index, subcat);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabClick = async (index, subcat) => {
    setProducts(null);
    setActiveTab(index);
    const newIndex = parseInt(index);
    console.log(subcat);
    if (subcat && subcat[newIndex]) {
      console.log("noor index", subcat[newIndex]);

      try {
        // Fetch data only if it hasn't been fetched before for the clicked tab

        setIsLoadingProducts(true);
        const { data } = await axios.post(
          "http://admin.artabiasa.com/api/get-products-by-sub-id",
          {
            pers_fk: getPayload() && getPayload().sub,
            subcat_fk: subcat[index].subcat_pk,
            api_password: process.env.REACT_APP_API_PASSWORD,
          }
        );

        console.log("getProducts ksdjfks->", data.data.data);

        if (data.status === "true") {
          // Update the data for the current tab
          subcat[newIndex].data = data.data.data;
          setProducts(data.data.data);
          setIsFavorite(data.data.data.map((product) => product.isFavorite));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingProducts(false);
      }
    }
  };

  if (!subcat_cat_fk) {
    return <p>Loading...</p>;
  }

  const CustomTabTitle = ({ subcatData, index }) => (
    <a onClick={() => handleTabClick(index, subcat)}>
      <div className="rounded-full bg-white flex items-center p-1">
        <img
          src={`http://admin.artabiasa.com/storage/${subcatData.subcat_image}`}
          alt={subcatData.subcat_etext}
          style={{ width: "40px", height: "40px" }}
          className="mr-2 rounded-full"
        />
        <span className="text-black font-bold text-2xl mr-2">
          {subcatData.subcat_etext}
        </span>
      </div>
    </a>
  );

  return (
    <>
      <Header />
      <div className="bg-white mt-0.5 color_home">
        <div className="grid grid-cols-12 lg:mx-auto mb-4">
          <div className=" box col-span-12 ml-5 mt-10 flex flex-col justify-center items-start lg:col-span-6  lg:ml-32 lg:-mt-6 md:col-span-6 ">
            <h1 className=" text-6xl font-semibold text-[#F2097A] mb-3">
              {categoryData.cat_etext}
            </h1>
            <h2 className=" text-2xl font-semibold">
              Elevate Your Walls with Artabia: Where Every Stroke Speaks
              Sophistication and Every Canvas Echoes Timeless Beauty.
            </h2>

          
          </div>
          <div className="box col-span-12 lg:col-span-6 md:col-span-6 mt-12 flex flex-col items-center  mb-14">
            <img
              src={`http://admin.artabiasa.com/storage/${categoryData.cat_image}`}
              className="mr-2 h-[333px] w-[332px] rounded-md"
              alt="Search"
            />
          </div>
        </div>
      </div>
      <div>
        <Tabs className="mx-2">
          {subcat &&
            subcat.map((subcat_data, index1) => (
              <Tabs.Item
                key={index1}
                active={index1 === activeTab}
                title={
                  <CustomTabTitle subcatData={subcat_data} index={index1} />
                }
                className="m-0"
              >
                {isLoadingProducts ? (
                  <p>Loading products...</p>
                ) : (
                  <div className="grid grid-cols-12 gap-y-8 mx-4 lg:mx-32 mb-12 lg:mt-2 mt-8 ">
                    {products &&
                      products.map((product_data, index) => (
                        <div
                          key={index}
                          className="box col-span-6 lg:col-span-4 md:col-span-4 mr-2 lg:mx-auto relative lg:mb-5"
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",
                              background: "white",
                              padding: "8px",
                              borderRadius: "50%",
                              cursor: "pointer",
                              color: isFavorite[index] ? "red" : "black",
                            }}
                            onClick={() =>
                              handleFavorite(product_data.artw_pk, index1)
                            }
                          >
                            <HiOutlineHeart />
                          </div>
                          <Link href={`/product/${product_data.artw_pk}`}>
                            <img
                              src={
                                product_data.artw_cover_image
                                  ? `http://admin.artabiasa.com/storage/${product_data.artw_cover_image}`
                                  : ""
                              }
                              className="w-[185px] h-[222px] lg:mx-auto"
                              alt="Search"
                            />
                          </Link>

                          <div className="flex  flex-col text-left gap-1 mt-1">
                            <h5 className="text-1xl font-bold">
                              {product_data.artw_atext}
                            </h5>
                            <h5 className="text-1xl font-bold">
                              By:{product_data.owner_id.pers_etext}
                            </h5>
                            <h5 className="text-1xl font-bold ">
                              {product_data.isFavorite &&
                                product_data.isFavorite.pers_fk}
                            </h5>
                            <div className="flex flex-row justify-between items-center">
                              <p className="text-gray-600 text-sm font-semibold">
                                {`${product_data.artw_width} X  ${product_data.artw_length} cm`}
                              </p>
                              <p className="text-gray-600 text-sm font-semibold">
                                {`${product_data.artw_price} SAR`}
                              </p>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                              <p className="text-gray-600 text-sm font-semibold">
                                Favorite Count:
                              </p>
                              <p className="text-gray-600 text-sm font-semibold">
                                {product_data.isFavoriteCount}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </Tabs.Item>
            ))}
        </Tabs>
      </div>
      <Footerr />
    </>
  );
};

export default Category;
