"use client";

import Layout from "@/components/layout/layout";
import { HiOutlineHeart, HiAdjustments, HiClipboardList } from "react-icons/hi";
import { Tabs } from "flowbite-react";
import SculptureIcon from "../../public/img/scu.png";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const Category = () => {


  const router = useRouter();
  const [cat_id, setCatID] = useState(null);
  const [subcat, setSubcat] = useState(null);
  const [isLoadingArtworks, setIsLoadingArtworks] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (router.query.subcat_cat_fk) {
      setCatID(router.query.subcat_cat_fk);
    }
  }, [router.query.subcat_cat_fk]);

  useEffect(() => {
    if (cat_id !== null) {
      const getSubCat = async () => {
        setIsLoadingArtworks(true);
        try {
          const { data } = await axios.post(
            "http://admin.artabiasa.com/api/get-sub-categories-by-id",
            {
              subcat_cat_fk: cat_id,
              api_password: process.env.REACT_APP_API_PASSWORD,
            }
          );

          console.log("getSubCate ->", data.data.data);

          if (data.status === "true") {
            setSubcat(data.data.data);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoadingArtworks(false);
        }
      };

      getSubCat();
    }
  }, [cat_id]);

  useEffect(() => {
    console.log(cat_id);
  }, [cat_id]);

  if (cat_id === null) {
    return <p>Loading...</p>;
  }




  const CustomTabTitle1 = () => (
    <div className="rounded-full bg-white flex items-center p-1 ">
      <img
        src="/img/paint.png"
        alt="Sculpture"
        width={40}
        height={24}
        className="mr-3 rounded-full"
      />
      <span className="text-black font-bold text-2xl mr-2">Sub Category 1</span>
    </div>
  );
  const CustomTabTitle2 = () => (
    <div className="rounded-full bg-white flex items-center p-1 ">
      <img
        src="/img/scu.png"
        alt="Sculpture"
        width={40}
        height={24}
        className="mr-3 "
      />
      <span className="text-black font-bold text-2xl mr-2">Sub Category 2</span>
    </div>
  );
  const CustomTabTitle3 = () => (
    <div className="rounded-full bg-white flex items-center p-1 ">
      <img
        src="/img/paint.png"
        alt="Sculpture"
        width={40}
        height={24}
        className="mr-3 "
      />
      <span className="text-black font-bold text-2xl mr-2">Sub Category 3</span>
    </div>
  );
  const CustomTabTitle4 = () => (
    <div className="rounded-full bg-white flex items-center p-1 ">
      <img
        src="/img/scu.png"
        alt="Sculpture"
        width={40}
        height={24}
        className="mr-3 "
      />
      <span className="text-black font-bold text-2xl mr-2">Sub Category 4</span>
    </div>
  );
  return (
    <Layout>
      <div className="bg-white mt-0.5 color_home">
        <div className="grid grid-cols-12 lg:mx-auto mb-4">
          <div className=" box col-span-12 ml-5 mt-10 flex flex-col justify-center items-start lg:col-span-6  lg:ml-32 lg:-mt-6 md:col-span-6 ">
            <h1 className=" text-6xl font-semibold text-[#F2097A] mb-3">
              Paintings
            </h1>
            <h2 className=" text-2xl font-semibold">
              Victory Art has an extensive online art collection of unique
              paintings by over 100 emerging Central and Eastern European
              artists...
            </h2>

            <button
              style={{ background: "#C38EBF", color: "black" }}
              className="px-4 py-1 mt-8 rounded-full "
            >
              Read More
            </button>
          </div>
          <div className="box col-span-12 lg:col-span-6 md:col-span-6 mt-12 flex flex-col items-center  mb-14">
            <img
              src="/img/category.png"
              className="mr-2 h-[333px] w-[332px] "
              alt="Search"
            />
          </div>
        </div>
      </div>
      <div>
        <Tabs className="mx-2">
          <Tabs.Item active title={<CustomTabTitle1 />} className="m-0">
            <div className="grid grid-cols-12 gap-y-8 mx-4 lg:mx-32 mb-12 lg:mt-2 mt-8 ">
              <div className="box col-span-6 lg:col-span-4 md:col-span-4 mr-2 lg:mx-auto relative lg:mb-5">
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "white",
                    padding: "8px",
                    borderRadius: "50%",
                  }}
                >
                  <HiOutlineHeart />
                </div>
                <img
                  src="/img/card4.png"
                  className="w-[185px] h-[222px] lg:mx-auto"
                  alt="Search"
                />

                <div class="flex  flex-col text-left gap-1 mt-1">
                  <h5 className="text-1xl font-bold ">خديجة</h5>
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-gray-600 text-sm font-semibold">
                      1 x 60 cm
                    </p>
                    <p className="text-gray-600 text-sm font-semibold">
                      5000 SAR
                    </p>
                  </div>
                </div>
              </div>
              <div className="box col-span-6 lg:col-span-4 md:col-span-4 mr-2 lg:mx-auto relative lg:mb-5">
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "white",
                    padding: "8px",
                    borderRadius: "50%",
                  }}
                >
                  <HiOutlineHeart />
                </div>
                <img
                  src="/img/card5.png"
                  className="w-[185px] h-[222px] lg:mx-auto "
                  alt="Search"
                />

                <div class="flex  flex-col text-left gap-1 mt-1">
                  <h5 className="text-1xl font-bold ">Abdullah hammas</h5>
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-gray-600 text-sm font-semibold">
                      150 x 150 cm
                    </p>
                    <p className="text-gray-600 text-sm font-semibold">
                      8500 SAR
                    </p>
                  </div>
                </div>
              </div>
              <div className="box col-span-6 lg:col-span-4 md:col-span-4 mr-2 lg:mx-auto relative lg:mb-5">
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "white",
                    padding: "8px",
                    borderRadius: "50%",
                  }}
                >
                  <HiOutlineHeart />
                </div>
                <img
                  src="/img/card6.png"
                  className="w-[185px] h-[222px] lg:mx-auto "
                  alt="Search"
                />

                <div class="flex  flex-col text-left gap-1 mt-1">
                  <h5 className="text-1xl font-bold ">Abdullah Alshehri</h5>
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-gray-600 text-sm font-semibold">
                      100 x 100 cm
                    </p>
                    <p className="text-gray-600 text-sm font-semibold">
                      6000 SAR
                    </p>
                  </div>
                </div>
              </div>
              <div className="box col-span-6 lg:col-span-4 md:col-span-4 mr-2 lg:mx-auto relative lg:mb-5">
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "white",
                    padding: "8px",
                    borderRadius: "50%",
                  }}
                >
                  <HiOutlineHeart />
                </div>
                <img
                  src="/img/card4.png"
                  className="w-[185px] h-[222px] lg:mx-auto"
                  alt="Search"
                />

                <div class="flex  flex-col text-left gap-1 mt-1">
                  <h5 className="text-1xl font-bold ">خديجة</h5>
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-gray-600 text-sm font-semibold">
                      1 x 60 cm
                    </p>
                    <p className="text-gray-600 text-sm font-semibold">
                      5000 SAR
                    </p>
                  </div>
                </div>
              </div>
              <div className="box col-span-6 lg:col-span-4 md:col-span-4 mr-2 lg:mx-auto relative lg:mb-5">
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "white",
                    padding: "8px",
                    borderRadius: "50%",
                  }}
                >
                  <HiOutlineHeart />
                </div>
                <img
                  src="/img/card5.png"
                  className="w-[185px] h-[222px] lg:mx-auto "
                  alt="Search"
                />

                <div class="flex  flex-col text-left gap-1 mt-1">
                  <h5 className="text-1xl font-bold ">Abdullah hammas</h5>
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-gray-600 text-sm font-semibold">
                      150 x 150 cm
                    </p>
                    <p className="text-gray-600 text-sm font-semibold">
                      8500 SAR
                    </p>
                  </div>
                </div>
              </div>
              <div className="box col-span-6 lg:col-span-4 md:col-span-4 mr-2 lg:mx-auto relative lg:mb-5">
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "white",
                    padding: "8px",
                    borderRadius: "50%",
                  }}
                >
                  <HiOutlineHeart />
                </div>
                <img
                  src="/img/card6.png"
                  className="w-[185px] h-[222px] lg:mx-auto "
                  alt="Search"
                />

                <div class="flex  flex-col text-left gap-1 mt-1">
                  <h5 className="text-1xl font-bold ">Abdullah Alshehri</h5>
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-gray-600 text-sm font-semibold">
                      100 x 100 cm
                    </p>
                    <p className="text-gray-600 text-sm font-semibold">
                      6000 SAR
                    </p>
                  </div>
                </div>
              </div>
              <div className="box col-span-6 lg:col-span-4 md:col-span-4 mr-2 lg:mx-auto relative lg:mb-5">
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "white",
                    padding: "8px",
                    borderRadius: "50%",
                  }}
                >
                  <HiOutlineHeart />
                </div>
                <img
                  src="/img/card4.png"
                  className="w-[185px] h-[222px] lg:mx-auto"
                  alt="Search"
                />

                <div class="flex  flex-col text-left gap-1 mt-1">
                  <h5 className="text-1xl font-bold ">خديجة</h5>
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-gray-600 text-sm font-semibold">
                      1 x 60 cm
                    </p>
                    <p className="text-gray-600 text-sm font-semibold">
                      5000 SAR
                    </p>
                  </div>
                </div>
              </div>
              <div className="box col-span-6 lg:col-span-4 md:col-span-4 mr-2 lg:mx-auto relative lg:mb-5">
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "white",
                    padding: "8px",
                    borderRadius: "50%",
                  }}
                >
                  <HiOutlineHeart />
                </div>
                <img
                  src="/img/card5.png"
                  className="w-[185px] h-[222px] lg:mx-auto "
                  alt="Search"
                />

                <div class="flex  flex-col text-left gap-1 mt-1">
                  <h5 className="text-1xl font-bold ">Abdullah hammas</h5>
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-gray-600 text-sm font-semibold">
                      150 x 150 cm
                    </p>
                    <p className="text-gray-600 text-sm font-semibold">
                      8500 SAR
                    </p>
                  </div>
                </div>
              </div>
              <div className="box col-span-6 lg:col-span-4 md:col-span-4 mr-2 lg:mx-auto relative lg:mb-5">
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "white",
                    padding: "8px",
                    borderRadius: "50%",
                  }}
                >
                  <HiOutlineHeart />
                </div>
                <img
                  src="/img/card6.png"
                  className="w-[185px] h-[222px] lg:mx-auto "
                  alt="Search"
                />

                <div class="flex  flex-col text-left gap-1 mt-1">
                  <h5 className="text-1xl font-bold ">Abdullah Alshehri</h5>
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-gray-600 text-sm font-semibold">
                      100 x 100 cm
                    </p>
                    <p className="text-gray-600 text-sm font-semibold">
                      6000 SAR
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Item>
          <Tabs.Item title={<CustomTabTitle2 />}>
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Dashboard tab's associated content
            </span>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </Tabs.Item>
          <Tabs.Item title={<CustomTabTitle3 />}>
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Settings tab's associated content
            </span>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </Tabs.Item>
          <Tabs.Item title={<CustomTabTitle4 />}>
            This is{" "}
            <span className="font-medium text-gray-800 dark:text-white">
              Contacts tab's associated content
            </span>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classes to control the content
            visibility and styling.
          </Tabs.Item>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Category;
