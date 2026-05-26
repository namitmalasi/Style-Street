import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../services/api";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,

      register: async (formData) => {
        try {
          set({ loading: true });

          const res = await api.post("/auth/register", formData);

          set({
            user: res.data,
            loading: false,
          });

          return { success: true };
        } catch (error) {
          set({ loading: false });

          return {
            success: false,
            message: error.response.data.message,
          };
        }
      },

      login: async (formData) => {
        try {
          set({ loading: true });

          const res = await api.post("/auth/login", formData);

          set({
            user: res.data,
            loading: false,
          });

          return { success: true };
        } catch (error) {
          set({ loading: false });

          return {
            success: false,
            message: error.response.data.message,
          };
        }
      },

      logout: async () => {
        await api.post("/auth/logout");

        set({
          user: null,
        });
      },

      checkAuth: async () => {
        try {
          const res = await api.get("/auth/me");

          set({
            user: res.data,
            isAuthenticated: true,
          });
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);

export default useAuthStore;
