import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product, quantity, size) => {
        const items = get().cartItems;

        const existingItem = items.find(
          (item) => item._id === product._id && item.size === size,
        );

        if (existingItem) {
          const updatedItems = items.map((item) =>
            item._id === product._id && item.size === size
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                }
              : item,
          );

          set({ cartItems: updatedItems });
        } else {
          set({
            cartItems: [
              ...items,
              {
                ...product,
                quantity,
                size,
              },
            ],
          });
        }
      },

      removeFromCart: (id, size) => {
        const filteredItems = get().cartItems.filter(
          (item) => !(item._id === id && item.size === size),
        );

        set({
          cartItems: filteredItems,
        });
      },

      updateQuantity: (id, size, quantity) => {
        const updatedItems = get().cartItems.map((item) =>
          item._id === id && item.size === size
            ? {
                ...item,
                quantity,
              }
            : item,
        );

        set({
          cartItems: updatedItems,
        });
      },

      getCartTotal: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
      clearCart: () => {
        set({
          cartItems: [],
        });
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);

export default useCartStore;
