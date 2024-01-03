"use client";
import { getLocalToken, getPayload } from "@/pages/enviroment/auth";
import axios from "axios";
import { useEffect, useState } from "react";

function CartTable({ cart, removeArtworkFromCart, setTotalQuantity,setCart, cart_data, index, setTotalPrice, totalPrice }) {
  // const [quantity, setQuantity] = useState(() =>
  //   Array.from({ length: cart.length }, (_, index) => {
  //     const initialPrice = cart[index]?.price;
  //     return isNaN(initialPrice) ? 1 : 1;
  //   })
  // );

  const [quantity, setQuantity] = useState(1);
  // setTotalPrice((prev)=>prev+parseInt(cart_data.price));


  useEffect(() => {
    console.log('asd')
      setTotalPrice((prev)=>prev+parseInt(cart_data.price));

    if (cart && cart.length > 0) {
      const initialQuantities = cart.map((cart_data) => {
        const initialPrice = cart_data.price;
        return isNaN(initialPrice) ? 1 : 1;
      });

      setQuantity(initialQuantities);
      console.log(cart_data.price)
      console.log("sad")
    // setTotalPrice([...totalPrice,{index: cart_data.price}])
    // console.log(totalPrice)

    }
  }, [cart]);

  const handleIncrement = () => {
    // const newQuantities = [...quantity];
    // newQuantities[index] += 1;
    console.log(quantity);
    setQuantity((prev)=>prev+1);
    setTotalQuantity((prev)=>prev+1)
    setTotalPrice((prev)=>prev+parseInt(cart_data.price));

    // calculateTotalPrice();
  };

  const handleDecrement = () => {
    // const newQuantities = [...quantity];
    // if (newQuantities[index] > 1) {
    //   newQuantities[index] -= 1;
    //   setQuantity(newQuantities);
    // }
    setQuantity((prev)=>prev-1);
    setTotalQuantity((prev)=>prev-1)
    setTotalPrice((prev)=>prev+parseInt(cart_data.price));

    // calculateTotalPrice()
  };

  const calculateTotalPrice = () => {
    // console.log([{
    //   index: cart_data.price * quantity
    // }]);
    // // console.log(totalPrice.include(index))
    
    // setTotalPrice([...totalPrice,{index: cart_data.price * quantity}])
    // console.log(totalPrice)
    // return cart_data.price * quantity;
  };

  return (
    <>
      
        {/* const actualIndex = index;

        const totalPrice =
          isNaN(cart_data.price) ||
          isNaN(quantity[actualIndex]) ||
          !isFinite(cart_data.price * quantity[actualIndex])
            ? "Invalid Price or Quantity"
            : cart_data.price * quantity[actualIndex]; */}

          <tr
            // key={actualIndex}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td className="flex justify-center py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <img
                src={
                  cart_data.artwork_id.artw_cover_image
                    ? `http://admin.artabiasa.com/storage/${cart_data.artwork_id.artw_cover_image}`
                    : ""
                }
                className="w-[100px] h-[100px]"
                alt="Search"
              />
            </td>
            <td className="px-6 py-4 text-start">
              <div className="flex flex-col">
                <span className="mb-1">{cart_data.artwork_id.artw_atext}</span>
                <span className="mb-1">
                  Availability: <span className="text-[#FF0078]">In Stock</span>
                </span>
              </div>
            </td>
            <td className="px-6 py-4 text-center">{cart_data.price} SAR</td>
            <td className="px-6 py-4 text-center">
              {/* <button className="font-bold text-3xl mr-2" onClick={() => handleDecrement()}>-</button> */}
              <div className="border border-black rounded-full inline-block px-6">
                {quantity}
              </div>
              {/* <button className="font-bold text-2xl ml-1"  onClick={() => handleIncrement()}>+</button> */}
            </td>
            <td className="px-6 py-4 text-center">{cart_data.price * quantity} SAR</td>
            <td className="py-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  removeArtworkFromCart(cart_data.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <rect width="20" height="20" fill="black" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.1904 10.2167L15.5716 14.598L14.598 15.5716L10.2168 11.1903L5.83557 15.5716L4.86196 14.598L9.24319 10.2167L4.86196 5.83549L5.83557 4.86188L10.2168 9.24311L14.598 4.86188L15.5716 5.83549L11.1904 10.2167Z"
                    fill="white"
                    stroke="white"
                  />
                </svg>
              </a>
            </td>
          </tr>
        
      
    </>
  );
}

export default CartTable;
