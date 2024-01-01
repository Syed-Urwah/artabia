"use client";
import axios from "axios";
import { Blockquote } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ImageFile = ({ setImagefile, setArtwCoverImage }) => {
    const [image, setImage] = useState([]);
    const [artwCover, setArtwCover] = useState();


    const handleArtwCover = (event) => {

        const files = event.target.files;
        
        
        if (files) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    //   setUploadedImages((prevImages) => {
                    //     const updatedImages = [...prevImages];
                    //     updatedImages[alksdfj] = reader.result;
                    //     return updatedImages;
                    //   });

                    setArtwCover(reader.result);
                };
                reader.readAsDataURL(file);
                setArtwCoverImage(file);
            });
        }
    };



    const handleFileUpload = (event) => {
        const files = event.target.files;
      
        if (files) {
          const images = Array.from(files);
      
          setImagefile((prevImages) => [...prevImages, ...images]);
      
          Array.from(files).forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              setImage((prevImages) => [...prevImages, reader.result]);
            };
            reader.readAsDataURL(file);
          });
        }
      };
      
    return (
        <>
            <div className="flex gap-4 mt-4 mb-4 lg:flex-row flex-col">
                <div className="flex w-full">
                    <label
                        for="dropzone-file"
                        class="flex flex-col items-center justify-center w-full h-[345px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                        {artwCover ? (
                            <img
                                className="w-full h-full max-w-full object-cover rounded-lg"
                                src={artwCover}
                                alt=""
                            />
                        ) : (
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span class="font-semibold">Click to upload</span> or drag
                                    and drop
                                </p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">
                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                            </div>
                        )}
                        <input
                            id="dropzone-file"
                            type="file"
                            onChange={handleArtwCover}
                            class="hidden"
                        />
                    </label>
                </div>
                <div>
                    <img src="/img/physical.svg" alt="" />
                </div>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-4 mt-4">

                {image && image.length > 0 ? (
                    image.map((img, index) => (
                        <label key={index} className="flex flex-col items-center justify-center w-full h-[200px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <img
                                className="w-full h-full max-w-full object-cover rounded-lg"
                                src={img}
                                alt={`Image ${index + 1}`}
                            />
                        </label>
                    ))
                ) : (
                    <label className="flex flex-col items-center justify-center w-full h-[200px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="51" height="49" viewBox="0 0 51 49" fill="none">
                                <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M5.7837 0H45.19C47.9105 0 50.1158 2.1938 50.1158 4.9V44.1C50.1158 46.8062 47.9105 49 45.19 49H5.7837C3.06326 49 0.85791 46.8062 0.85791 44.1V4.9C0.85791 2.1938 3.06326 0 5.7837 0ZM5.78359 4.8999V33.2866L15.6364 23.4854L24.2568 32.0606L40.2645 16.1367L45.1899 21.0363V4.8999H5.78359ZM5.78359 44.0999V40.2163L15.6364 30.415L29.3934 44.0999H5.78359ZM45.1899 44.0999H36.3595L27.7399 35.5254L40.2645 23.0664L45.1899 27.966V44.0999ZM30.4128 14.7006C30.4128 10.6413 27.1048 7.35059 23.0241 7.35059C18.9435 7.35059 15.6355 10.6413 15.6355 14.7006C15.6355 18.7599 18.9435 22.0506 23.0241 22.0506C27.1048 22.0506 30.4128 18.7599 30.4128 14.7006ZM20.5612 14.6995C20.5612 13.3464 21.6638 12.2495 23.0241 12.2495C24.3843 12.2495 25.487 13.3464 25.487 14.6995C25.487 16.0526 24.3843 17.1495 23.0241 17.1495C21.6638 17.1495 20.5612 16.0526 20.5612 14.6995Z" fill="black" />
                            </svg>
                        </div>
                    </label>
                )};
                <div className="flex flex-col w-full items-center justify-center">
                    <label for="dropzone-file-1" >
                        <input
                            id="dropzone-file-1"
                            type="file"
                            onChange={handleFileUpload}
                            class="hidden"
                        />
                        <img src="/img/plus.svg" alt="" />
                    </label>
                </div>
                <div className="flex flex-col w-full items-center justify-center">
                    <p>
                        Your Artwork Is A Tangible Item, Which Will Ship. This Includes
                        Prints of Digital Artpieces.
                    </p>
                </div>
            </div>
        </>
    );
};

export default ImageFile;
