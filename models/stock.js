const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  userName: {type: String, required: true},
  password: {type: String, required: true},
  Symbol: { type: Array, required: false},
  priceHistory: { type: Array, required: false },
  
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
