require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PaymentModel = require("./payment");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("CONNECTED TO DATABASE SUCCESSFULLY");
  } catch (error) {
    console.error("COULD NOT CONNECT TO DATABASE:", error.message);
  }
}

// --> The server calls itself every 10 minutes and performs a fetch to keep it active.
// This is necessary because we are using Render, a free platform, and if the server is inactive for 10 minutes,
// the project will be deactivated.
setInterval(() => {
  fetch("https://aichat-project-backend.onrender.com/payments");
  console.log("fetch");
}, [600000]);
// <--

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/payments", (req, res) => {
  PaymentModel.find()
    .then((payments) => res.json(payments))
    .catch((err) => res.json(err));
});

app.post("/payment/create", (req, res) => {
  PaymentModel.create(req.body)
    .then((payment) => res.json(payment))
    .catch((err) => res.json(err));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
