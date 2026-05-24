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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Payment Successful 🎉</h1>

      <p className="text-gray-600">Thank you for your purchase.</p>

      <button
        onClick={() => navigate("/")}
        className="bg-black text-white px-6 py-3 rounded-xl mt-5 cursor-pointer"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default SuccessPage;
