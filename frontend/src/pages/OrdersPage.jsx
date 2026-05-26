import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import api from "../services/api";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/my-orders");

        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-500 mb-8">Track and manage your orders</p>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-6">No orders yet</p>
            <a
              href="/"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="card p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 pb-6 border-b border-gray-200 mb-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase">
                      Order ID
                    </p>
                    <p className="text-gray-900 font-mono text-sm mt-1">
                      {order._id}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-500 uppercase">
                      Total Amount
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{order.totalPrice}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex gap-4 py-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0 bg-gray-100"
                      />

                      <div className="flex-1">
                        <h2 className="font-semibold text-gray-900">
                          {item.title}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                          Size: {item.size}
                        </p>

                        <div className="flex items-center gap-4 mt-2">
                          <p className="text-gray-700">
                            Quantity:{" "}
                            <span className="font-medium">{item.quantity}</span>
                          </p>
                          <p className="text-gray-700">
                            ₹<span className="font-medium">{item.price}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
