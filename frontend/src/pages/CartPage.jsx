import Navbar from "../components/Navbar";
import api from "../services/api";
import useCartStore from "../store/cartStore";
import toast from "react-hot-toast";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } =
    useCartStore();

  const handleCheckout = async () => {
    try {
      const res = await api.post("/payments/create-checkout-session", {
        products: cartItems,
      });

      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Shopping Cart</h1>
        <p className="text-gray-500 mb-8">
          {cartItems.length} items in your cart
        </p>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-6">Your cart is empty</p>
            <a
              href="/"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item._id}-${item.size}`}
                  className="card p-4 flex gap-4 items-center"
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-28 h-28 object-cover rounded-lg flex-shrink-0"
                  />

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Size: {item.size}
                    </p>

                    <p className="font-bold text-gray-900 mt-2">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.size,
                            item.quantity > 1 ? item.quantity - 1 : 1,
                          )
                        }
                        className="border border-gray-300 hover:border-gray-400 px-3 py-1 rounded transition"
                      >
                        −
                      </button>

                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.size, item.quantity + 1)
                        }
                        className="border border-gray-300 hover:border-gray-400 px-3 py-1 rounded transition"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        removeFromCart(item._id, item.size);
                        toast.success("Item removed");
                      }}
                      className="text-gray-500 hover:text-red-600 text-sm font-medium mt-4 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="card p-6 h-fit">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Order Summary
              </h2>

              <div className="space-y-3 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{getCartTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>

              <div className="flex justify-between my-6 text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>₹{getCartTotal()}</span>
              </div>

              <button
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By continuing, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
