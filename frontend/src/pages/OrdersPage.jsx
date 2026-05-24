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
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order._id} className="border rounded-xl p-6">
                <div className="flex justify-between mb-6">
                  <div>
                    <p className="font-semibold">Order ID</p>

                    <p className="text-gray-500 text-sm">{order._id}</p>
                  </div>

                  <div>
                    <p className="font-semibold">Total</p>

                    <p>₹{order.totalPrice}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />

                      <div>
                        <h2 className="font-semibold">{item.title}</h2>

                        <p className="text-gray-500">Size: {item.size}</p>

                        <p>Qty: {item.quantity}</p>
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
