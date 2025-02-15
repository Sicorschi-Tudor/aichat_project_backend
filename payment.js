const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  amount: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "success", "failed"],
    required: true,
  },
});

// Specifică numele colecției ca 'payments'
const PaymentModel = mongoose.model("Payment", PaymentSchema, "payments");

module.exports = PaymentModel;
