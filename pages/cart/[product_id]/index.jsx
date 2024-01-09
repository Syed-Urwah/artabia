"use client";
import Layout from "@/components/layout/layout";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { getLocalToken, getPayload, getUserType } from "../../../enviroment/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import CartTable from "@/components/product/CartTable";
import { useRouter } from "next/router";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
const Cart = () => {
  const router = useRouter();
  const [product_id, setProductID] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartSum, setCartSum] = useState(null);
  const [updatedCart, setUpdatedCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (router.query.product_id) {
      setProductID(router.query.product_id);
    }
  }, [router.query.product_id]);


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
        console.log("taksjd");
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

  return (
    <Layout>
      <div className="lg:px-16 px-4 py-16">
        <p className="col-span-full text-3xl font-bold ">Cart</p>

        <div className="py-8 w-full">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-center text-gray-700 uppercase bg-[#dcdada] dark:bg-gray-700 dark:text-gray-400 bg-opacity-30 rounded-full">
                <tr>
                  <th scope="col" className=" -px-2 py-3 rounded-full">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-full">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-full">
                    Unit price without VAT
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-full">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-full">
                    Total with VAT
                  </th>
                  <th scope="col" className=" py-3 rounded-full"></th>
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
            {/* <div className="flex flex-row justify-end gap-1 mt-14">
              <button className="bg-opacity-20 rounded-full px-5 py-1 border border-black bg-[#dcdada]">
                Delete cart
              </button>
              <button className="bg-opacity-20 rounded-full px-5 py-1 border border-black bg-[#dcdada]">
                Recalculate
              </button>
            </div> */}

            {/* <div className="lg:flex lg:flex-row ml-8 lg:ml-0 lg:justify-end gap-2 mt-6 items-center">
              <span>Use promo code</span>
              <input
                type="text"
                placeholder="Enter the code"
                className="bg-[#EBEBEB] lg:rounded-full mr-1 mt-1 lg:mr-0"
              />
              <button className="bg-opacity-20 lg:rounded-full px-6 py-1 border border-black bg-[#dcdada]">
                Insert
              </button>
            </div> */}

            <div className="flex flex-row justify-end gap-4 mt-3 ">
              <div class="max-w-sm p-6 bg-[#F8F8F8] border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 class="mb-2   tracking-tight text-gray-900 dark:text-white">
                  TOTAL AMOUNT OF ITEMS IN YOUR CART
                </h5>
                <div className="flex flex-row justify-between  ">
                  <span className="text-gray-500">Quantity:</span>
                  <span className="text-gray-500">{totalQuantity ? totalQuantity : 0}</span>
                </div>
                <div className="flex flex-row justify-between  ">
                  <span className="text-gray-500">Total price with VAT:</span>
                  <span className="font-semibold">{totalPrice} SAR</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between gap-4 mt-5">
              <Link href={`/product/${product_id}`}>
                <button className="flex flex-row bg-opacity-20 lg:rounded-full px-4 py-2 border border-black bg-[#b9b4b4] items-center">
                  <HiOutlineArrowLeft className="mr-1 h-5 w-7 " /> Back to the
                  shop
                </button>
              </Link>
              <Link href={`/cart/${product_id}/all_shipping`}>
                <button className="bg-opacity-20 lg:rounded-full px-6 py-2  bg-[#F21079]">
                  Choosing a Shipping & Payment Method
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
