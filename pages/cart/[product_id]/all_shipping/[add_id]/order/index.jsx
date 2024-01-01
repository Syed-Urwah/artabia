"use client";
import Layout from "@/components/layout/layout";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import CartTable from "@/components/product/CartTable";
import { useRouter } from "next/router";
import axios from "axios";
import { getLocalToken, getPayload, getUserType } from "@/pages/enviroment/auth";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
const Order = () => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const [product_id, setProductID] = useState(null);
  const [address_id, setAddressID] = useState(router.query.add_id || null);
  const [artwID, setArtwID] = useState(null);
  const [cart, setCart] = useState([]);

  const [cartSum, setCartSum] = useState(null);
  const [updatedCart, setUpdatedCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState(null);
  const [supplierAddress, setSupplierAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (router.query.product_id) {
      setProductID(router.query.product_id);
    }
  }, [router.query.product_id]);
  useEffect(() => {
    if (router.query.add_id) {
      console.log('id', router.query.add_id);
      setAddressID(router.query.add_id);
    }
  }, [router.query.add_id]);



  useEffect(() => {
    const getAddress = async () => {
      setIsLoading(true);
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
        if (data.status === "true") {
          if (address_id) {
            const filteredAddresses = data.data.find(
              (add_data) => add_data.addr_pk == address_id
            );

            if (filteredAddresses) {
              setAddress(filteredAddresses);
              setIsLoading(false);
            }
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    getAddress();
  }, [address_id]);


  useEffect(() => {
    const getAddress = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.post(
          "http://admin.artabiasa.com/api/get-artist-details",
          {
            id: artwID,
            api_password: process.env.REACT_APP_API_PASSWORD,
          },
          {
            headers: {
              Authorization: 'Bearer ' + getLocalToken(),
            },
          }
        );
        console.log("checking supplier", data.data_artist);
        if (data.status === "true") {

          setSupplierAddress(data.data_artist);
          setIsLoading(false);


        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    getAddress();
  }, [artwID]);

  useEffect(() => {
    if (address && address.addr_user_id) {
      console.log("address", address);
      if (address.addr_user_id.pers_etext) {
        console.log("name", address.addr_user_id.pers_etext);
      }
    }
  }, [address]);




  const removeArtworkFromCart = async (itemId) => {

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
            "http://admin.artabiasa.com/api/delete-cart",
            {
              id: itemId,
              user_id: getPayload().sub,
              api_password: process.env.REACT_APP_API_PASSWORD,
            },
            {
              headers: {
                Authorization: "Bearer " + getLocalToken(),
              },
            }
          );

          if (data.status === "false") {
            console.log("taksjd");
            setCart((prevCart) => prevCart.filter((cart) => cart.id !== itemId));
            getCart();
          }
          getCart();

        } catch (error) {
          console.log(error);
        }
      }
    });



  };
  const getCart = async () => {
    if (getUserType() !== "user") return;
    try {
      const { data } = await axios.post(
        "http://admin.artabiasa.com/api/get-cart",
        {
          id: getPayload().sub,
          api_password: process.env.REACT_APP_API_PASSWORD,
          "Content-Language": "en",
        },
        {
          headers: {
            Authorization: "Bearer " + getLocalToken(),
          },
        }
      );
      console.log("getCart ->", data);
      setTotalQuantity(data.data.length);

      if (data.status === "false") {
        setCart([]);
        setCartSum(0);
        return;
      }
      if (data.status === "true") {

        setArtwID(data.data[0].artwork_id.owner_id.id)

        setCart(data.data);
        setCartSum(data.sum);
        setCartCount(data.count_cart);
      }
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  useEffect(() => {
    const getCart = async () => {
      if (getUserType() !== "user") return;
      try {
        const { data } = await axios.post(
          "http://admin.artabiasa.com/api/get-cart",
          {
            id: getPayload().sub,
            api_password: process.env.REACT_APP_API_PASSWORD,
            "Content-Language": "en",
          },
          {
            headers: {
              Authorization: "Bearer " + getLocalToken(),
            },
          }
        );
        console.log("getCart ->", data);
        console.log(data.data.length)
        setTotalQuantity(data.data.length);



        if (data.status === "false") {
          setCart([]);
          setCartSum(0);
          return;
        }
        if (data.status === "true") {
          console.log("taksjd");
          setCart(data.data);
          setArtwID(data.data[0].artwork_id.owner_id.id)
          console.log("artwork", artwID);
          setCartSum(data.sum);
          setCartCount(data.count_cart);
        }
        return data;
      } catch (error) {
        console.log(error);
        return false;
      }
    };
    getCart();
  }, []);
  useEffect(() => {
    console.log("artwork", artwID);
  }, [artwID]);


  const handleSubmitOrder = async () => {
    console.log(artwID);
    try {
      const { data } = await axios.post(
        "http://admin.artabiasa.com/api/execute-order",
        {
          user_id: getPayload().sub,
          artist_id: artwID,
          addres_id: address_id,
          description: "any thing",
          sub_total: totalPrice,
          delivery_price: '3',
          final_total: totalPrice,
          payment_id: 0,
          api_password: process.env.REACT_APP_API_PASSWORD,
        },
        {
          headers: {
            Authorization: "Bearer " + getLocalToken(),
          },
        }
      );

      if (data.status === "true") {
        setOpenModal(true)
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className="lg:px-16 px-4 py-16">
        <p className="col-span-full text-3xl font-bold ">Order Information</p>

        <div className="col-span-full flex flex-row  bg-[#8C0D81] bg-opacity-30 px-10 py-2 rounded-full relative z-20 justify-around">
          <p className="font-bold w-1/2">Supplier Info</p>
          <p className="font-bold w-1/2 px-5">Customer Info</p>
        </div>
        <div className="relative overflow-x-auto rounded-lg mt-[-15px]">
          {isLoading ?
            (
              <p>Loading...</p>
            ) :
            (
              <div className="flex flex-row p-10 bg-[#F8F8F8] border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700 ">
                <div className="flex flex-col w-1/2  border-r border-gray-300">
                  {supplierAddress && supplierAddress.pers_atext && (
                    <span class=" text-gray-600  dark:text-white">
                      {supplierAddress.pers_atext}
                    </span>
                  )}

                  <span className="text-gray-500">Jeddah 21452</span>
                  <span className="text-gray-500 font-semibold">
                    204 Alamal Plaza Hail Street PO Box 6659
                  </span>


                  <span className="text-gray-500 mt-6">
                    Phone Number:
                    {supplierAddress && supplierAddress.pers_phone && (
                      <span className="text-gray-500 lg:ml-1">{supplierAddress.pers_phone}</span>
                    )}

                  </span>

                  <span className="text-gray-500 ">
                    Email:
                    {supplierAddress && supplierAddress.pers_email && (
                      <span className="text-gray-500 lg:ml-1">
                        {supplierAddress.pers_email}
                      </span>
                    )}

                  </span>
                </div>

                <div className="flex flex-col w-1/2 pl-6">
                  {address && address.addr_user_id && (
                    <span class="text-gray-600 dark:text-white">
                      {address.addr_user_id.pers_etext}
                    </span>
                  )}
                  {address && address.addr_country_fk && (
                    <span className="text-gray-500">
                      {address.addr_city_fk.city_etext} , {address.addr_country_fk.country_etext}
                    </span>

                  )}

                  {address && address.addr_postal_code && (
                    <span className="text-gray-500">
                      {address.addr_postal_code}
                    </span>

                  )}

                  {address && address.addr_country_fk && (
                    <span className="text-gray-500">
                      {address.addr_country_fk.country_etext}
                    </span>

                  )}

                  {address && address.addr_user_id && (
                    <span className="text-gray-500 mt-16">
                      Phone Number:
                      <span className="text-gray-500 lg:ml-1">{address.addr_user_id.pers_phone}</span>
                    </span>

                  )}
                  {address && address.addr_user_id && (
                    <span className="text-gray-500 ">
                      Email:
                      <span className="text-gray-500 lg:ml-1">{address.addr_user_id.pers_email}</span>
                    </span>

                  )}
                  {/* <span className="text-gray-500 underline ">
                    Change Delivery Data!
                  </span> */}
                </div>
              </div>
            )}

        </div>

        <div className="py-8 w-full">
          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-center text-gray-700 uppercase bg-[#dcdada] dark:bg-gray-700 dark:text-gray-400 bg-opacity-30 rounded-full">
                <tr>
                  <th scope="col" class=" -px-2 py-3 rounded-full">
                    Image
                  </th>
                  <th scope="col" class="px-6 py-3 rounded-full">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3 rounded-full">
                    Unit price without VAT
                  </th>
                  <th scope="col" class="px-6 py-3 rounded-full">
                    Quantity
                  </th>
                  <th scope="col" class="px-6 py-3 rounded-full">
                    Total with VAT
                  </th>
                </tr>
              </thead>

              <tbody>
                {cart.map((cart_data, index) => {

                  return <CartTable
                    index={index}
                    setTotalPrice={setTotalPrice}
                    totalPrice={totalPrice}
                    cart_data={cart_data}
                    setTotalQuantity={setTotalQuantity}
                    removeArtworkFromCart={(itemId) =>
                      removeArtworkFromCart(itemId)
                    }
                    setCart={setCart}
                  />
                })}
              </tbody>
            </table>

            <div className="text-left items-center">
              <p className="col-span-full mt-5  lg:mx-32 text-1xl text-gray-400 font-normal ">
                Courier (Countries in European Union)
              </p>
            </div>

            <div className="flex flex-row justify-end gap-4 mt-3 ">
              <div className="flex flex-col ">
                <div class="max-w-sm p-6 bg-[#F8F8F8] border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700">
                  <h5 class="mb-1   tracking-tight text-gray-900 dark:text-white">
                    PAYMENT METHOD
                  </h5>
                  <div className="flex flex-col   ">
                    <span className="text-gray-500">Bank Account:</span>
                    <span className="text-gray-500">TOTAL PRICE</span>
                  </div>
                  <div className="flex flex-row justify-between  ">
                    <span className="text-gray-500">
                      Total price without VAT:
                    </span>
                    <span className="text-gray-500 lg:ml-3">{totalPrice} SAR</span>
                  </div>
                  <div className="flex flex-row justify-between  ">
                    <span className="text-black-500 font-semibold">
                      Total price with VAT:
                    </span>
                    <span className="font-semibold">{totalPrice} SAR</span>
                  </div>
                </div>
                <div className="flex items-center mb-4 rounded-full bg-gray-100 p-3 mt-2 border border-gray-400">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 border-gray-300  focus:ring-blue-200"
                  />
                  <label
                    for="default-checkbox"
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    I agree with the terms and conditions.
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between gap-4 mt-5">
              <Link href="/shipping">
                <button className="flex flex-row bg-opacity-20 lg:rounded-full px-4 py-2 border border-black bg-[#b9b4b4] items-center">
                  <HiOutlineArrowLeft className="mr-1 h-5 w-7 " /> Back to the
                  Shipping Address
                </button>
              </Link>

              <button
                onClick={handleSubmitOrder}
                className="bg-opacity-20 lg:rounded-full px-6 py-2  bg-[#F21079]"
              >
                Send the Order with Payment Obligation
              </button>
              <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header
                  style={{
                    border: 0,
                    backgroundImage: 'url("/img/layer_1.png")',
                    backgroundSize: "cover",
                  }}
                  className="h-[5px]"
                ></Modal.Header>
                <Modal.Body
                  style={{
                    border: 0,
                    backgroundImage: 'url("/img/layer_1.png")',
                    backgroundSize: "cover",
                  }}
                >
                  <div className="flex justify-center">
                    <div className="flex flex-col   items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-pink-400 border-pink-400 border-solid border-2 mb-1 rounded-full "
                        viewBox="0 0 20 20"
                        fill="none"
                        style={{ padding: "4px" }}
                      >
                        <path
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-3xl">
                        Your Art Journey Just Started
                      </span>
                      <p className="text-sm font-normal">
                        Thank You FOR YOUR ORDER! GREAT CHOICE!
                      </p>
                      <Link href={'/main'}>
                        <button className="text-sm bg-opacity-20 rounded-full px-2 py-1 mt-5 mb-5 bg-[#F21079]">
                          Proceed to checkout
                        </button>
                      </Link>

                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
