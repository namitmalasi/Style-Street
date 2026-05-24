import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className="border rounded-xl overflow-hidden hover:shadow-lg transition">
      <img
        src={product.images[0]}
        alt={product.title}
        loading="lazy"
        className="w-full h-72 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.title}</h2>

        <p className="text-gray-500 text-sm mt-1">{product.category}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold">₹{product.price}</span>

          <button
            className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
