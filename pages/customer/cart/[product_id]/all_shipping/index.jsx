"use client";
import Layout from "@/components/layout/layout";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineTrash } from "react-icons/hi";
import { useEffect, useState } from "react";
import { getLocalToken, getPayload } from "@/enviroment/auth";
import axios from "axios";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useRouter } from "next/router";
const MySwal = withReactContent(Swal);

const Address = () => {
  const router = useRouter();
  const [product_id, setProductID] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressId, setAddressId] = useState(null);
  const [address, setAddress] = useState([]);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  useEffect(() => {
    if (router.query.product_id) {
      console.log(router.query);
      setProductID(router.query.product_id);
    }
  }, [router.query.product_id]);


  useEffect(() => {

    const getAddress = async () => {
      try {
        const { data } = await axios.post(
          "http://admin.artabiasa.com/api/get-addresses",
          {
            addr_user_id: getPayload() && getPayload().sub,
            api_password: process.env.REACT_APP_API_PASSWORD,
          },
          {
            headers: {
              Authorization: 'Bearer ' + getLocalToken(),
            },
          }
        );
        console.log("Address =>", data.data);
        if (data.status === "true") {
          setAddress(data.data);

        }
      } catch (error) {
        console.log(error);
      }
    };
    getAddress();
  }, []);
  const handleSelectAddress = (index,addr_pk) => {
    setSelectedAddress(index === selectedAddress ? null : index);
    setAddressId(addr_pk);
  };

  const handlePaymentMethod = () => {
    if (addressId) {
      const add_id = selectedAddress;
      // const product_id2 = router.query.product_id;
      router.replace(`customer/cart/${product_id}/all_shipping/${addressId}`);
    }
  };

  const handleDeleteAddress = async (addr_pk) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this address!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.post(
            "http://admin.artabiasa.com/api/delete-address",
            {
              addr_pk: addr_pk,
              api_password: process.env.REACT_APP_API_PASSWORD,
            },
            {
              headers: {
                Authorization: 'Bearer ' + getLocalToken(),
              },
            }
          );
  
          console.log("Address =>", data.data);
  
          if (data.status === "true") {
            setAddress((prevAddresses) => prevAddresses.filter((address) => address.addr_pk !== addr_pk));
          }
        } catch (error) {
          console.log(error);
        }
  
        console.log(`Deleting address at index ${addr_pk}`);
      }
    });
  };
  
  


  return (
    <Layout>
      <div className="lg:px-16 px-4 py-16">
        <p className="col-span-full text-3xl font-bold">Shipping Address</p>

        <div className="py-3 w-full">


          {address &&
            address.map((addrs, index) => (
              <div key={index}>
                <div
                  className={`col-span-full  font-bold bg-[#8C0D81] bg-opacity-30 px-4 py-2 rounded-full relative z-20 mt-6 flex justify-between items-center ${selectedAddress === 1 ? "bg-pink-500" : ""
                    }`}
                >
                  <label className="flex items-center">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      id={`address${index + 1}`}
                      checked={selectedAddress === index + 1}
                      onChange={() => handleSelectAddress(index + 1,addrs.addr_pk)}
                      className="mr-2"
                    />
                    {/* Address Text */}
                    <p>{addrs.addr_etext}</p>
                  </label>
                  {/* Delete Icon */}
                  <HiOutlineTrash
                    className="ml-2 h-6 w-10 cursor-pointer"
                    onClick={() => handleDeleteAddress(addrs.addr_pk)}
                  />
                </div>

                <div className="relative overflow-x-auto rounded-lg mt-[-15px]">
                  <div className="p-6 bg-[#F8F8F8] border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 ">
                    <div className="">
                      <div className="grid grid-cols-12 mt-4 gap-5">
                        <div className="box col-span-12 lg:col-span-12 md:col-span-12 ">
                          <h1 className="font-bold">{addrs.addr_country_fk.country_etext}</h1>
                          <h1 className="font-bold">
                            City:{" "}
                            <span className="font-normal text-gray-500">{addrs.addr_city_fk.city_etext}</span>
                          </h1>
                          <span className="font-normal text-gray-500">
                            Address: P.E.C.H.S Block 6
                          </span>

                          <h1 className="font-normal text-gray-500">
                            Postcode:{" "}
                            <span className="font-normal text-gray-500">{addrs.addr_postal_code}</span>
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

        </div>
        <div className="flex justify-center ">
          <Link href={`${process.env.NEXT_PUBLIC_FRONT_END_URL}/customer/cart/${product_id}/all_shipping/shipping`}>
            <button
              style={{ border: "2px solid #F1C4D9", color: "black" }}
              className="px-10 rounded-full flex items-center"
            >
              Add New Address{" "}
              <span className="font-bold text-2xl ml-1 mb-1">+</span>
            </button>
          </Link>
        </div>
        <div className="flex flex-row justify-between gap-4 mt-5">
          <Link href={`${process.env.NEXT_PUBLIC_FRONT_END_URL}/customer/cart/${product_id}`}>
            <button className="flex flex-row bg-opacity-20 lg:rounded-full px-4 py-2 border border-black bg-[#b9b4b4] items-center">
              <HiOutlineArrowLeft className="mr-1 h-5 w-7 " /> Back to the Cart
            </button>
          </Link>
          <Link href={`${process.env.NEXT_PUBLIC_FRONT_END_URL}/customer/cart/${product_id}/all_shipping/${addressId}/`}>
            <button  className="bg-opacity-20 lg:rounded-full px-6 py-2  bg-[#F21079]">
              Choosing a Payment Method
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Address;
