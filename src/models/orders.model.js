const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema(
  {
    cartId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
        required: true,
      },
    ],
    isPaymentSucceeded: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ordersModel = mongoose.model("orders", ordersSchema);

module.exports = ordersModel;
