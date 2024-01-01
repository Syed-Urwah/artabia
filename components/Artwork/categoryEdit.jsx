"use client";
import { getPayload } from "@/pages/enviroment/auth";
import axios from "axios";
import { useEffect, useState } from "react";

const CategoryEdit = ({ subcat_fk ,cat_fk , setCatFk, setSubCatFk }) => {


    const [categories, setCategories] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [activeCat, setActiveCat] = useState();
    const [activeSubCat, setActiveSubCat] = useState();
    const [subcat, setSubcat] = useState(null);
    const [isLoadingSubCat, setIsLoadingSubCat] = useState(false);
    const itemsPerPage = 4;

    const getSubCat = async (id) => {
        console.log("id", id);

        setCatFk(id);
        const payload = getPayload();

        if (!payload) {
            router.push("/login");
            return;
        }
        setIsLoadingSubCat(true);
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
                console.log('check');
                setSubcat(data.data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingSubCat(false);
        }
    };
    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await axios.post(
                    "http://admin.artabiasa.com/api/get-categories",
                    {
                        api_password:
                            "mVtRqwedl8sMNMgyUsadls7uigOdU234Ru1Kvi0Jljafe2232dnfsdfl5",
                    }
                );
                console.log("Categories =>", data);
                if (data.status === "true") {
                    setCategories(data.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getCategories();
        getSubCat(cat_fk);
        setActiveCat(cat_fk);
        setActiveSubCat(subcat_fk)
    }, [cat_fk,subcat_fk]);



    // const visibleCategories = categories.slice(
    //     startIndex,
    //     startIndex + itemsPerPage
    // );


    const handleCategoryClick = (categoryId, index) => {
        setActiveCat(categoryId);
        getSubCat(categoryId)
        console.log(`Category with ID ${categoryId} clicked. Sending API request...`);
    };


    const handleSubCategoryClick = (subCatId, index) => {
        setActiveSubCat(subCatId);
        setSubCatFk(subCatId);
    };




    return (
        <>
            <div className="flex lg:flex-row flex-col gap-4 mt-5 ">
                <div className="w-1/2">
                    <h1>Select Art Category!</h1>

                    <div className="flex lg:flex-row flex-col py-4 gap-x-8 overflow-x-auto">
                        {categories && categories.map((category, index) => (
                            <a onClick={() => handleCategoryClick(category.cat_pk, index)}>
                                <div
                                    key={index}
                                    className={`bg-[#fef3f8] rounded-xl px-5 py-5 ${activeCat === category.cat_pk ? 'border-[#F21079] border-2 h-50' : ''}`}
                                >
                                    <img
                                        src={`http://admin.artabiasa.com/storage/${category.cat_image}`}
                                        alt=""
                                        className="lg:w-56 lg:h-32 rounded-xl"
                                    />
                                    <h1 className="font-bold text-xl text-center">{category.cat_etext}</h1>
                                </div>
                            </a>

                        ))}


                        {/* <div className="bg-[#fef3f8] rounded-xl px-5 py-5 h-50">
                  <img
                    src="/img/p_1.png"
                    alt=""
                    className="lg:lg:w-56 lg:h-32 rounded-xl "
                  />
                  <h1 className="font-bold text-xl text-center">Sculpture</h1>
                </div> */}
                    </div>
                </div>
                <div className="w-1/2 ">
                    <h1>Select Art Category!</h1>
                    {isLoadingSubCat ? (
                        <p>Loading Sub Category...</p>
                    ) : (
                        <div className="flex lg:flex-row flex-col py-4 gap-x-5 overflow-x-auto">
                            {subcat && subcat.map((subcat_data, index) => (
                                <a onClick={() => handleSubCategoryClick(subcat_data.subcat_pk, index)}>
                                    <div key={index} className={` rounded-xl flex flex-col items-center ${activeSubCat === subcat_data.subcat_pk ? 'border-[#F21079] border-2 h-50' : 'bg-[#fef3f8]'}`}>
                                        <img
                                            src={`http://admin.artabiasa.com/storage/${subcat_data.subcat_image}`}
                                            alt=""
                                            className="w-56 h-40 rounded-t-xl rounded-b-none"
                                        />
                                        <h1 className="font-semibold text-xl text-center px-5 py-1">
                                            {subcat_data.subcat_atext}
                                        </h1>
                                    </div>
                                </a>

                            ))}
                        </div>
                    )}


                </div>
            </div>
        </>
    );
};

export default CategoryEdit;
