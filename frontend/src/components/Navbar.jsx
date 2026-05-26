import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import useCartStore from "../store/cartStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { cartItems } = useCartStore();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-black tracking-tight cursor-pointer"
        >
          StyleStreet
        </h1>

        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/orders")}
            className="font-medium hover:text-gray-500"
          >
            Orders
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <ShoppingCart size={22} />

            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>

          <span className="hidden sm:block text-sm text-gray-500">
            {user?.name}
          </span>

          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded-xl hover:opacity-90 active:scale-95 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
