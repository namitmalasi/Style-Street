import Navbar from "../components/Navbar";
import api from "../services/api";
import useCartStore from "../store/cartStore";

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
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={`${item._id}-${item.size}`}
                  className="flex gap-4 border p-4 rounded-xl"
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{item.title}</h2>

                    <p className="text-gray-500">Size: {item.size}</p>

                    <p className="font-bold mt-2">₹{item.price}</p>

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            item.size,
                            item.quantity > 1 ? item.quantity - 1 : 1,
                          )
                        }
                        className="border px-3 py-1 rounded"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.size, item.quantity + 1)
                        }
                        className="border px-3 py-1 rounded"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id, item.size)}
                      className="text-red-500 mt-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border rounded-xl p-6 h-fit">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="flex justify-between mb-4">
                <span>Total</span>

                <span className="font-bold">₹{getCartTotal()}</span>
              </div>

              <button
                className="w-full bg-black text-white py-4 rounded-xl cursor-pointer"
                onClick={handleCheckout}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
