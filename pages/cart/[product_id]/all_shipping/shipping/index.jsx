"use client";
import Layout from "@/components/layout/layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { getLocalToken, getPayload } from "@/enviroment/auth";
import { useRouter } from "next/router";
import Swal from 'sweetalert2';

const Shipping = () => {
  const router = useRouter();
  const [product_id, setProductID] = useState(null);
  const [country, setCountry] = useState([]);
  const [city, setCity] = useState([]);
  const [isLoadingCity, setIsLoadingCity] = useState(false);

  useEffect(() => {
    if (router.query.product_id) {
      setProductID(router.query.product_id);
    }
  }, [router.query.product_id]);
  const getCity = async (id) => {
    console.log("id", id);
    setCity([]);
    const payload = getPayload();

    if (!payload) {
      router.push("/login");
      return;
    }
    setIsLoadingCity(true);
    try {
      const { data } = await axios.post(
        'http://admin.artabiasa.com/api/get-city',
        {
          city_country_fk: id,
          api_password: process.env.REACT_APP_API_PASSWORD,
        },
        {
          headers: {
            Authorization: 'Bearer ' + getLocalToken(),
          },
        }
      )


      console.log(data);

      console.log("getCity ->", data.data);

      if (data.status === "true") {
        console.log('check');
        setCity(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingCity(false);
    }
  };


  useEffect(() => {
    const getCountry = async () => {
      try {
        const { data } = await axios.post(
          "http://admin.artabiasa.com/api/get-country",
          {
            api_password:
              "mVtRqwedl8sMNMgyUsadls7uigOdU234Ru1Kvi0Jljafe2232dnfsdfl5",
          }
        );
        console.log("country =>", data);
        if (data.status === "true") {
          setCountry(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCountry();
  }, []);

  const [formData, setFormData] = useState({
    addr_etext: '',
    addr_atext: '',
    addr_neighborhood: '',
    addr_city_fk: '',
    addr_country_fk: '',
    addr_street: '',
    addr_number: '',
    addr_description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'addr_country_fk') {
      console.log('aklsdfjlk');
      getCity(value);
    }
    console.log('Name:', name, 'Value:', value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [formErrors, setFormErrors] = useState({
    addr_etext: [],
    addr_atext: [],
    addr_neighborhood: [],
    addr_city_fk: [],
    addr_country_fk: [],
    addr_street: [],
    addr_number: [],
    addr_description: []
  });

  const resetFormErrors = (field) => {
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [field]: [],
    }));
  };



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!getPayload()) {
      router.push("/login");
      return;
    }
    formData.addr_user_id = getPayload() && getPayload().sub
    formData.api_password, process.env.REACT_APP_API_PASSWORD

    console.log("form Data", formData);
    try {
      const { data } = await axios.post(
        "http://admin.artabiasa.com/api/save-address",
        formData
        , {
          headers: {
            Authorization: 'Bearer ' + getLocalToken(),
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'Content-Language': 'en',
          },
        }
      );

      if (data.status === "true") {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data successfully added!',
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            router.push(`/cart/${product_id}/all_shipping`);
          }
        });
      }
      if (data.status === "false") {
        console.log("errors ->", data.error);
        setFormErrors({
          ...formErrors,
          ...data.error
        });
      }
    } catch (error) {
      console.error("Login failed", error);
      // Handle error, e.g., show error messages
    }
  };



  return (
    <Layout>
      <div className="lg:px-16 px-4 py-16">
        <p className="col-span-full text-3xl font-bold">Shipping Address</p>
        <form onSubmit={handleFormSubmit}>
          <div className="py-8 w-full">
            <p className="col-span-full  font-bold bg-[#8C0D81] bg-opacity-30 px-4 py-2 rounded-full relative z-20">
              Personal Data
            </p>
            <div className="relative overflow-x-auto rounded-lg mt-[-15px]">
              <div className="p-6 bg-[#F8F8F8] border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 ">
                <div className="">
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div className=" mb-6">
                      <label
                        for="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Address Name En
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        id="addr_etext"
                        name="addr_etext"
                        placeholder=""
                        onChange={(e) => {
                          handleInputChange(e);
                          resetFormErrors('addr_etext');
                        }}
                        required
                      />
                      {formErrors.error &&
                        formErrors.error.map((err, i) => (
                          <h1 key={i} className="text-red-500 mt-2  flex justify-center">
                            * {err}
                          </h1>
                        ))}
                    </div>
                    <div className=" mb-6">
                      <label
                        for="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Address Name AR
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        id="addr_atext"
                        name="addr_atext"
                        placeholder=""
                        onChange={(e) => {
                          handleInputChange(e);
                          resetFormErrors('addr_atext');
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="col-span-full  font-bold bg-[#8C0D81] bg-opacity-30 px-4 py-2 rounded-full relative z-20 mt-8">
              Shipping Data
            </p>
            <div className="relative overflow-x-auto rounded-lg mt-[-15px]">
              <div className="p-6 bg-[#F8F8F8] border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 ">
                <div className="">
                  <div className="grid grid-cols-12 mt-4 gap-5">
                    <div className="box col-span-12 lg:col-span-6 md:col-span-6 flex flex-row items-center">
                      <label
                        htmlFor="country"
                        className="text-gray-500 font-normal text-lg mr-6 lg:mr-6 "
                      >
                        Country
                      </label>
                      <select
                        id="addr_country_fk"
                        name="addr_country_fk"
                        value={formData.addr_country_fk}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="0" selected >Choose a Contry</option>
                        {country &&
                          country.map((data, index) => (
                            <option key={index} value={data.country_pk}>
                              {data.country_etext}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="box col-span-12 lg:col-span-6 md:col-span-6 flex flex-row items-center">
                      <label
                        htmlFor="street"
                        className="text-gray-500 font-normal text-lg mr-10 lg:mr-10 "
                      >
                        Street Name
                      </label>
                      <input
                        type="text"
                        id="addr_street"
                        name="addr_street"
                        placeholder=""
                        onChange={(e) => {
                          handleInputChange(e);
                          resetFormErrors('addr_street');
                        }}
                        aria-describedby="helper-text-explanation"
                        className=" bg-[#E8F0FE] border border-[#CCC] text-black-900 text-sm block p-2 w-full lg:w-[466px]"
                      />
                    </div>

                    <div className="box col-span-12 lg:col-span-6 md:col-span-6 flex flex-row items-center">
                      <label
                        htmlFor="city"
                        className="text-gray-500 font-normal text-lg mr-14 lg:mr-[55px] "
                      >
                        City
                      </label>
                      {isLoadingCity ? (
                        <p>Loading Sub Category...</p>
                      ) : (<select
                        id="addr_city_fk"
                        name="addr_city_fk"
                        value={formData.addr_city_fk}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="0" defaultValue>Choose a City</option>
                        {city &&
                          city.map((data, index) => (
                            <option key={index} value={data.city_pk}>
                              {data.city_etext}
                            </option>
                          ))}
                      </select>)}

                    </div>
                    <div className="box col-span-12 lg:col-span-6 md:col-span-6 flex flex-row items-center">
                      <label
                        htmlFor="street"
                        className="text-gray-500 font-normal text-lg mr-3 lg:mr-4 "
                      >
                        Neighborhood
                      </label>
                      <input
                        type="text"
                        id="addr_neighborhood"
                        name="addr_neighborhood"
                        placeholder=""
                        onChange={(e) => {
                          handleInputChange(e);
                          resetFormErrors('addr_neighborhood');
                        }}
                        aria-describedby="helper-text-explanation"
                        className=" bg-[#E8F0FE] border border-[#CCC] text-black-900 text-sm block p-2 w-full lg:w-[466px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="col-span-full  text-2xl font-bold px-1 py-2 mt-6">
              Your Description
            </p>
            <div className="relative overflow-x-auto  rounded-3xl ">
              <div className="p-6 bg-[#F8F8F8] border border-gray-200  rounded-3xl  shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="mx-auto ">
                  <textarea
                    type="text"
                    id="addr_description"
                    name="addr_description"
                    placeholder=""
                    onChange={(e) => {
                      handleInputChange(e);
                      resetFormErrors('addr_description');
                    }}
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-[#FFF]  rounded-3xl  border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-center gap-4 mt-5">
            {/* <Link href="/all_shipping"> */}
            <button type="submit"
              style={{ border: "2px solid #F1C4D9", color: "black" }}
              className="px-10 py-1 rounded-full flex items-center"
            >
              Save

            </button>
            {/* </Link> */}

          </div>
        </form>

      </div>
    </Layout>
  );
};

export default Shipping;
