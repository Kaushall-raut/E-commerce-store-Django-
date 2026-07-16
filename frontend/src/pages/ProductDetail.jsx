import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../api/axios";

const ProductDetail = () => {
  const Base_Url = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoader] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const productDetail = async () => {
      try {
        const result = await getProductDetail(id);
        setProduct(result);
        setLoader(false);
      } catch (error) {
        setError(error.message);
        setLoader(false);
      }
    };
    productDetail();
  }, [id, Base_Url]);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return <h1>error</h1>;
  }

  if (!product) {
    return <h2>No products found</h2>;
  }

  
};

export default ProductDetail;
