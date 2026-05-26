import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import useCartStore from "../store/cartStore";
import toast from "react-hot-toast";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCartStore();

  const [product, setProduct] = useState(null);

  const [selectedSize, setSelectedSize] = useState("");

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);

        setProduct(res.data);

        setSelectedSize(res.data.sizes?.[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    toast.success("Added to cart");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {product.category}
            </p>

            <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-6">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-8">
              <p className="text-3xl font-bold text-gray-900">
                ₹{product.price}
              </p>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Select Size
              </h3>

              <div className="flex gap-3 flex-wrap">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-3 rounded-lg font-medium transition ${
                      selectedSize === size
                        ? "bg-gray-900 text-white"
                        : "border border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quantity
              </h3>

              <div className="flex items-center gap-4 bg-gray-50 w-fit rounded-lg p-2">
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                  className="hover:bg-gray-200 px-4 py-2 rounded transition"
                >
                  −
                </button>

                <span className="text-xl font-semibold w-8 text-center">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="hover:bg-gray-200 px-4 py-2 rounded transition"
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-lg text-lg font-medium transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
