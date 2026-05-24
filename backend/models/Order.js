import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        title: String,

        image: String,

        price: Number,

        quantity: Number,

        size: String,
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      default: "paid",
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
