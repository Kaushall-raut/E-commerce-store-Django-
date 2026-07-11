export const ProductCard = ({product}) => {
        const Base_Url=import.meta.env.VITE_BACKEND_URL
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg  hover:scale-[1] transition-transform p-4">
      <img
        src={`${Base_Url}${product.image}`}
        alt={product.name}
        className="w-full h-56 object-cover rounded-lg mb-4"
      />
      <h2 className="font-semibold mb-2 text-gray-800 truncate">{product.name}</h2>
      <p className="font-medium text-gray-600">RS {product.price}</p>
    </div>
  );
};
