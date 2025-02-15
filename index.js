const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PaymentModel = require("./payment"); // Corectăm importul aici

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://aaw1713tudor:7777777AAA@cluster0.wk7njla.mongodb.net/aichatdatabase?retryWrites=true&w=majority&appName=Cluster0",
      {}
    );
    console.log("CONNECTED TO DATABASE SUCCESSFULLY");
  } catch (error) {
    console.error("COULD NOT CONNECT TO DATABASE:", error.message);
  }
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Accesarea colecției payments
app.get("/payments", (req, res) => {
  PaymentModel.find() // Folosim PaymentModel în loc de UserModel
    .then((payments) => res.json(payments))
    .catch((err) => res.json(err));
});

// Crearea unui nou document de plată
app.post("/payment/create", (req, res) => {
  PaymentModel.create(req.body) // Folosim PaymentModel pentru a crea un nou document
    .then((payment) => res.json(payment))
    .catch((err) => res.json(err));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
