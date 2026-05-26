import { useEffect } from "react";
import useCartStore from "../store/cartStore";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const SuccessPage = () => {
  const navigate = useNavigate();

  const { cartItems, getCartTotal, clearCart } = useCartStore();
  useEffect(() => {
    const createOrder = async () => {
      try {
        if (cartItems.length === 0) return;

        await api.post("/orders", {
          orderItems: cartItems.map((item) => ({
            product: item._id,
            title: item.title,
            image: item.images[0],
            price: item.price,
            quantity: item.quantity,
            size: item.size,
          })),

          totalPrice: getCartTotal(),
        });

        clearCart();
      } catch (error) {
        console.log(error);
      }
    };

    createOrder();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Payment Successful
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase! Your order has been confirmed.
        </p>

        <p className="text-sm text-gray-500 mb-8 max-w-md">
          Check your email for order confirmation and shipping details. You can
          also view your order status anytime in your orders page.
        </p>

        <div className="flex gap-4 flex-col sm:flex-row justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition order-2 sm:order-1"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="border-2 border-gray-900 text-gray-900 hover:bg-gray-50 px-8 py-3 rounded-lg font-medium transition order-1 sm:order-2"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
