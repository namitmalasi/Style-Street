import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card overflow-hidden cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div className="relative overflow-hidden bg-gray-100 h-72">
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <h2 className="text-base font-semibold text-gray-900 line-clamp-2">
          {product.title}
        </h2>

        <p className="text-sm text-gray-500 mt-1">{product.category}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price}
          </span>

          <button
            className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product._id}`);
            }}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
