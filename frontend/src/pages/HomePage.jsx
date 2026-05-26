import { useEffect } from "react";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

import useProductStore from "../store/productStore";

const HomePage = () => {
  const { products, fetchProducts, loading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-3">
            Latest Collection
          </h1>
          <p className="text-gray-600 mt-2 text-lg font-normal leading-relaxed max-w-2xl">
            Discover our newest styles and trending products
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading products...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
