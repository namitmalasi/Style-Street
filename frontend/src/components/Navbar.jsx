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
    <nav className="flex items-center justify-between p-4 border-b">
      <Link to="/">
        <h1 className="text-2xl font-bold cursor-pointer">StyleStreet</h1>
      </Link>
      <div className="flex items-center gap-4">
        <span>{user?.name}</span>

        <button className="cursor-pointer" onClick={() => navigate("/orders")}>
          Orders
        </button>

        <button onClick={() => navigate("/cart")} className="relative">
          <ShoppingCart />

          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
