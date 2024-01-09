import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/layout";
import ProductView from "@/components/product/ProductView";
import axios from "axios";
import { getPayload } from "@/enviroment/auth";

const Product = () => {
  const router = useRouter();
  const [product_id, setProductID] = useState(null);
  const [artwork, setArtwork] = useState(null);
  const [isLoadingArtworks, setIsLoadingArtworks] = useState(false);

  useEffect(() => {
    if (router.query.product_id) {
      setProductID(router.query.product_id);
    }
  }, [router.query.product_id]);

  useEffect(() => {
    if (product_id !== null) {
      const getArtwork = async () => {
        setIsLoadingArtworks(true);
        try {
          console.log("get", getPayload());
          const { data } = await axios.post(
            "http://admin.artabiasa.com/api/get-product-details",
            {
              pers_fk: getPayload() && getPayload().sub,
              artw_pk: product_id,
              api_password: process.env.REACT_APP_API_PASSWORD,
            }
          );

          console.log("getArtwork ->", data.data);

          if (data.status === "true") {
            setArtwork(data.data);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoadingArtworks(false);
        }
      };

      getArtwork();
    }
  }, [product_id]);

  useEffect(() => {
    console.log(product_id);
  }, [product_id]);

  if (product_id === null) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      {isLoadingArtworks ? (
        <p>Loading...</p>
      ) : (
        <>
          {artwork ? (
            <ProductView artwork={artwork} />
          ) : (
            <p>No artwork found</p>
          )}
        </>
      )}
    </Layout>
  );
};

export default Product;
