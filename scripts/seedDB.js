const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below


mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/stockScan_db",
    {
      useMongoClient: true
    }
  );

const articleSeed = [{
    title: "Justin",
    web_url:"www.nothing.com",
    pub_date: 2018
}
]