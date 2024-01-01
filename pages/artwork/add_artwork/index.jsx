"use client";
import Layout from "@/components/layout/layout";
import Link from "next/link";
import {
    HiOutlineArrowLeft,
    HiOutlineEye,
    HiOutlinePlus,
    HiOutlineTrash,
} from "react-icons/hi";
import Swal from 'sweetalert2';
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ImageFile from "@/components/Artwork/image";
import Category from "@/components/Artwork/category";
import { getLocalToken, getPayload } from "@/pages/enviroment/auth";
import { useRouter } from "next/router";

const AddArtwork = () => {
    const router = useRouter();
    const [artwCoverImage, setArtwCoverImage] = useState();
    const [imageFile, setImagefile] = useState([]);
    const [catFk, setCatFk] = useState();
    const [subCatFk, setSubCatFk] = useState();
    const [material, setMaterial] = useState([]);
    const [frame, setFrame] = useState([]);

    const [formData, setFormData] = useState({
        cat_fk: '',
        subcat_fk: '',
        frame_fk: '',
        material_fk: '',
        artwstat_fk: 1,
        artw_etext: "",
        artw_atext: "",
        artw_description_ar: "",
        artw_description_en: "",
        artw_price: '',
        artw_length: "",
        artw_width: "",
        artw_depth: '',
        artw_weight: '',
        artw_dimensions: "",
        artw_location: '',
        artw_atext: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log('Name:', name, 'Value:', value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const [formErrors, setFormErrors] = useState({
        cat_fk: [],
        subcat_fk: [],
        frame_fk: [],
        material_fk: [],
        artwstat_fk: [],
        artw_etext: [],
        artw_atext: [],
        artw_description_ar: [],
        artw_description_en: [],
        artw_price: [],
        artw_length: [],
        artw_width: [],
        artw_depth: [],
        artw_weight: [],
        artw_dimensions: [],
        artw_location: [],
    });

    const resetFormErrors = (field) => {
        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            [field]: [],
        }));
    };





    useEffect(() => {
        const getMaterial = async () => {
            try {
                const { data } = await axios.post(
                    "http://admin.artabiasa.com/api/get-material",
                    {
                        api_password:
                            "mVtRqwedl8sMNMgyUsadls7uigOdU234Ru1Kvi0Jljafe2232dnfsdfl5",
                    }
                );
                console.log("get-material =>", data);
                if (data.status === "true") {
                    setMaterial(data.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        const getFrame = async () => {
            try {
                const { data } = await axios.post(
                    "http://admin.artabiasa.com/api/get-frame",
                    {
                        api_password:
                            "mVtRqwedl8sMNMgyUsadls7uigOdU234Ru1Kvi0Jljafe2232dnfsdfl5",
                    }
                );
                console.log("get-material =>", data);
                if (data.status === "true") {
                    setFrame(data.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getFrame();
        getMaterial();
    }, []);





    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!getPayload()) {
            router.push("/login");
            return;
        }
        formData.cat_fk = catFk;
        formData.subcat_fk = subCatFk;
        formData.artw_cover_image = artwCoverImage;
        formData.images = [];
        console.log("-------",imageFile);
        imageFile.forEach((image) => {
            formData.images.push(image);
        });
        formData.api_password, process.env.REACT_APP_API_PASSWORD

        console.log("form Data",formData);
        try {
            const { data } = await axios.post(
                "http://admin.artabiasa.com/api/add-artwork",
                formData
                , {
                    headers: {
                        Authorization: "Bearer " + getLocalToken(),
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        'Content-Language': 'en',
                    },
                }
            );
            console.log("response ->", data);

            if (data.status === "true") {
                console.log('dsfjksd');
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data successfully added!',
                }).then((result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        router.push('/artwork')
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
                <div className=" flex justify-between">
                    <div className="flex gap-2">
                        <p className="col-span-full text-3xl ">ADD AN ARTWORK</p>
                    </div>
                    <button
                        type="button"
                        className="text-black bg-[#E3E3E3]  font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Instructions
                    </button>
                </div>
                <hr className="border-t border-gray-400 my-2" />

                <div>
                    <ImageFile setImagefile={setImagefile} setArtwCoverImage={setArtwCoverImage} />
                    <h1 className="text-[#F21079] my-4">Artwork photos are required</h1>
                    <Category  setCatFk={setCatFk} setSubCatFk={setSubCatFk} />
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div className=" mb-6">
                                <label
                                    for="first_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Title (Artwork Name)En
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    id="artw_etext"
                                    name="artw_etext"
                                    placeholder=""
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        resetFormErrors('artw_etext');
                                    }}
                                    required
                                />
                            </div>
                            <div className=" mb-6">
                                <label
                                    for="first_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Title (Artwork Name) AR
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    type="text"
                                    id="artw_atext"
                                    name="artw_atext"
                                    placeholder=""
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        resetFormErrors('artw_etext');
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div className="mb-6">
                                <label
                                    for="countries"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Art Material
                                </label>
                                <select
                                    id="material_fk"
                                    name="material_fk"
                                    value={formData.material_fk}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option disabled>Choose a Material</option>
                                    {material &&
                                        material.map((data, index) => (
                                            <option key={index} value={data.matr_pk}>
                                                {data.matr_etext}
                                            </option>
                                        ))}
                                </select>

                            </div>
                            <div className="mb-6">
                                <label
                                    for="countries"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Frame
                                </label>
                                <select
                                    id="frame_fk"
                                    name="frame_fk"
                                    value={formData.frame_fk}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option selected value="0" disabled>Choose a Frame</option>
                                    {frame && frame.map((data, index) => (
                                        <option key={index} value={data.frame_pk}>
                                            {data.frame_etext}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Dimensions
                        </label>
                        <div className="grid gap-6 mb-6 md:grid-cols-12">
                            <div className="flex flex-row items-center">
                                <input
                                    id="artw_dimensions"
                                    type="radio"
                                    value="cm"
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        resetFormErrors('artw_dimensions');
                                    }}
                                    name="artw_dimensions"
                                    className="w-4 h-4 rounded-full custom-radio"
                                />
                                <label
                                    htmlFor="artw_dimensions"
                                    className="ms-2 text-sm font-medium text-gray-900"
                                >
                                    cm
                                </label>
                            </div>
                            <div className="flex flex-row items-center mt-2">
                                <input
                                    id="artw_dimensions"
                                    type="radio"
                                    value="in"
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        resetFormErrors('artw_dimensions');
                                    }}
                                    name="artw_dimensions"
                                    className="w-4 h-4 rounded-full custom-radio"
                                />
                                <label
                                    htmlFor="artw_dimensions"
                                    className="ms-2 text-sm font-medium text-gray-900"
                                >
                                    in
                                </label>
                            </div>
                        </div>


                        <div className="grid gap-6 mb-6 md:grid-cols-4">
                            <div className="mb-6">
                                <input
                                    type="text"
                                    id="artw_length"
                                    name="artw_length"
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        resetFormErrors('artw_length');
                                    }}
                                    required

                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Height "
                                />


                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    id="artw_width"
                                    name="artw_width"
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        resetFormErrors('artw_width');
                                    }}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Width "
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    id="artw_depth"
                                    name="artw_depth"
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        resetFormErrors('artw_depth');
                                    }}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Depth "
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    id="artw_weight"
                                    name="artw_weight"
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        resetFormErrors('artw_weight');
                                    }}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="weight"
                                />
                            </div>
                        </div>

                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Price (SAR)
                                </label>
                                <input

                                    type="text"
                                    id="artw_price"
                                    name="artw_price"
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        resetFormErrors('artw_price');
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Price (SAR)"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Location
                                </label>
                                <input

                                    type="text"
                                    id="artw_location"
                                    name="artw_location"
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        resetFormErrors('artw_location');
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Location"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div className="mb-6">
                                <label
                                    for="message"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Specification Overview AR
                                </label>
                                <textarea

                                    type="text"
                                    id="artw_description_ar"
                                    name="artw_description_ar"
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        resetFormErrors('artw_description_ar');
                                    }}
                                    rows="4"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write your thoughts here..."
                                ></textarea>
                            </div>
                            <div className="mb-6">
                                <label
                                    for="message"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Specification Overview EN
                                </label>
                                <textarea

                                    type="text"
                                    id="artw_description_en"
                                    name="artw_description_en"
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        resetFormErrors('artw_description_en');
                                    }}
                                    rows="4"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write your thoughts here..."
                                ></textarea>
                            </div>
                        </div>


                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Layout >
    );
};

export default AddArtwork;
