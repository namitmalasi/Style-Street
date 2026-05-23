import { create } from "zustand";
import api from "../services/api";

const useProductStore = create((set) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    try {
      set({ loading: true });

      const res = await api.get("/products");

      set({
        products: res.data,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
      });

      console.log(error);
    }
  },
}));

export default useProductStore;