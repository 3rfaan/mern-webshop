const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: String,
        title: String,
        img: String,
        price: Number,
        quantity: {
          type: Number,
          default: 1,
        },
        color: String,
        size: String,
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "Verarbeitung",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
