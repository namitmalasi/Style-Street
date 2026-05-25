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
    return <p>Loading...</p>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    toast.success("Added to cart");
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="rounded-xl overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-[600px] object-cover"
          />
        </div>

        <div>
          <p className="text-gray-500 mb-2">{product.category}</p>

          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

          <p className="text-2xl font-semibold mb-6">₹{product.price}</p>

          <p className="text-gray-600 mb-8">{product.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Select Size</h3>

            <div className="flex gap-3">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-2 rounded-lg ${
                    selectedSize === size ? "bg-black text-white" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold mb-3">Quantity</h3>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                className="border px-4 py-2 rounded"
              >
                -
              </button>

              <span className="text-xl">{quantity}</span>

              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="border px-4 py-2 rounded"
              >
                +
              </button>
            </div>
          </div>

          <button
            className="w-full bg-black text-white py-4 rounded-xl text-lg cursor-pointer"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
