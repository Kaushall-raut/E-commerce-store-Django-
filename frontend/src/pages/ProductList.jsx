import { useEffect, useState } from "react";
import { fetchProducts } from "../api/axios";
import { ProductCard } from "../components/ProductCard";

const ProductList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProducts] = useState([]);

  useEffect(() => {
    const productList = async () => {
      try {
        const products = await fetchProducts();
        console.log("h",products);
        
        setProducts(products);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    productList();
  }, []);

  if (loading) {
    return <h2>Loading ....</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="shadow-md bg-white py-6 text-center text-3xl font-bold">
        Product List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {product.length>0 ? (
            product.map((product) => {
              
          return  <ProductCard id={product.id} product={product} />;
          })
        ) : (
          <p className="text-center col-span-full">No Products available</p>
        )}
      </div>
    </div>
  );
};
export default ProductList;
