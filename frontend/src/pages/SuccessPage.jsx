import { useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Payment Successful 🎉</h1>

      <p className="text-gray-600">Thank you for your purchase.</p>

      <button
        onClick={() => navigate("/")}
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default SuccessPage;
