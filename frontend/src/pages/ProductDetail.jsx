import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../api/axios";
import { userCart } from "../context/CartContext";

const ProductDetail = () => {
  const Base_Url = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoader] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = userCart();

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

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
        <div className=" flex flex-col md:flex-row gap-8">
          <img
            src={`${product.image}`}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg md:w-1/2"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-green-600 mb-6">
              {product.price}
            </p>
            <button onClick={()=> addToCart(product.id)} className="bg-blue-600 text-white px-6 py-2 transition rounded-lg hover:bg-blue-700">
              Add to cart
            </button>
            <div className="mt-4">
              <a href="/" className="text-blue-600 hover:underline ">
                Back to home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
