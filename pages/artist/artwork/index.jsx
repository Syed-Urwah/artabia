"use client";
import Link from "next/link";
import {
  HiOutlineArrowLeft,
  HiOutlineEye,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { getLocalToken, getPayload } from "../../enviroment/auth";
import axios from "axios";
import { useRouter } from "next/router";
import ArtistLayout from "@/components/layout/artistLayout";

const Artwork = () => {
  const router = useRouter();
  const [artworksCollections, setArtworksCollections] = useState([])
  const [isLoadingArtworks, setIsLoadingArtworks] = useState(true)

  const getArtworks = async () => {
    setIsLoadingArtworks(true)
    try {
      const { data } = await axios.post(
        'http://admin.artabiasa.com/api/get-artwork-artist',
        {
          user_id: getPayload().sub,
          api_password: process.env.REACT_APP_API_PASSWORD,
        },
        {
          headers: {
            Authorization: `Bearer ${getLocalToken()}`,
          },
        }
      )
      setIsLoadingArtworks(false)
      console.log('artworks ->', data)
      if (data.status === 'true') {
        setArtworksCollections(data.data)
      } else {
        setArtworksCollections([])
      }
    } catch (error) {
      console.log(error)
      setIsLoadingArtworks(false)
    }
  }

  useEffect(() => {
    getArtworks()
  }, [])



  const handleProduct = (product_id) => {
    router.push('/artist/artwork/product/view/' + product_id);

  };
  const handleEdit = (product_id) => {
    router.push('/artist/artwork/product/edit/' + product_id);

  };




  return (
    <ArtistLayout>
      <div className="lg:px-16 px-4 py-16">
        <div className=" flex justify-between">
          <div className="flex gap-2">
            <p className="col-span-full text-3xl ">ARTWORKS</p>
            <Link href="/artist/artwork/add_artwork">
              <button
                type="button"
                className="text-white bg-black  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add New
                <HiOutlinePlus className="w-5 h-5 ms-2" />
              </button>
            </Link>
          </div>
          <button
            type="button"
            className="text-black bg-[#E3E3E3]  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Instructions
          </button>
        </div>
        <hr className="border-t border-gray-400 my-2" />

        <div className="flex justify-end">
          <label
            for="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900"
              placeholder="Search"
              required
            />
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-4">
            {isLoadingArtworks ? (
              <></>
            ) : (
              <>
                {artworksCollections.map((collection) => (
                  collection.artwork.map((artwrk, index) => (
                    <div key={index} className="flex flex-col items-center  space-x-4 m-3 ">
                      <div className="relative ">
                        <img
                          src={`http://admin.artabiasa.com/storage/${artwrk.artw_cover_image}`}
                          alt={`Artwork ${artwrk.id}`}
                          className="w-[300px] h-[188px] object-cover rounded-lg"
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-5 space-x-2 p-2">
                          <HiOutlineEye onClick={() => handleProduct(artwrk.artw_pk)} className="text-white w-7 h-7 ms-2 hover:text-[#F4C7DC] " />
                          <svg onClick={() => handleEdit(artwrk.artw_pk)} className="text-white w-7 h-7 ms-2 group-hover:text-[#F4C7DC]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 31" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.3807 1.11097C25.6768 0.401466 24.7129 0 23.7074 0C22.7031 0 21.7402 0.40056 21.0323 1.11282L8.18005 13.9649C7.03159 14.9768 6.27874 16.4826 6.14791 18.1019L6.14293 23.0393V24.575H12.4925C14.2345 24.4555 15.755 23.6953 16.8277 22.4579L29.6071 9.68396C30.3161 8.97496 30.7144 8.01334 30.7144 7.01066C30.7144 6.00797 30.3161 5.04636 29.6071 4.33735L26.3807 1.11097ZM30.7143 27.643V16.893H27.6429V27.643H3.07143V3.07157H13.8214V0.000139509H3.07143C1.37513 0.000139509 0 1.37526 0 3.07157V27.643C0 29.3393 1.37513 30.7144 3.07143 30.7144H27.6429C29.3392 30.7144 30.7143 29.3393 30.7143 27.643ZM12.384 21.5073C13.2045 21.4492 13.9681 21.0674 14.5814 20.3659L23.8907 11.0566L19.6609 6.82652L10.2834 16.201C9.66117 16.7513 9.27626 17.5212 9.21436 18.2255V21.5044L12.384 21.5073ZM21.8331 4.65504L26.0625 8.88475L27.4353 7.51199C27.5683 7.37899 27.643 7.19861 27.643 7.01052C27.643 6.82243 27.5683 6.64204 27.4353 6.50904L24.2047 3.27839C24.0731 3.14584 23.8941 3.07129 23.7074 3.07129C23.5207 3.07129 23.3417 3.14584 23.2102 3.27839L21.8331 4.65504Z" fill="white" />
                          </svg>
                        </div>
                        <div
                          className="absolute top-0 right-0 flex items-center bg-[#373737]"
                          style={{ borderTopRightRadius: "10px" }}
                        >
                          <h1 className="text-white px-8">{collection.cat_etext}</h1>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <h5 className="text-2xl font-bold">{artwrk.artw_etext}</h5>
                        <p className="text-gray-600 text-sm font-semibold">{artwrk.artw_price} SAR</p>
                      </div>
                    </div>
                  ))
                ))}
              </>
            )}

          </div>
        </div>
      </div>
    </ArtistLayout>
  );
};

export default Artwork;
