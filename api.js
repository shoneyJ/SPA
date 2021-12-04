const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const { application, json } = require("express");

const api = express();
const PORT = 3200;

api.use(cors());
api.use(express.json());
api.use(express.urlencoded({ extends: true })); //Parse URL-encoded bodies

const config = require("../nodejsapp/config/config.js");

var con = mysql.createConnection(config.databaseOptions);
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

const hotelRouter = require("./apiroutes/hotelRouter")(con);
//api.use("/api", hotelRouter);

const bookingRouter = require("./apiroutes/bookingRouter")(con);
const customerRouter = require("./apiroutes/customerRouter")(con);

api.use("/api", [hotelRouter,bookingRouter,customerRouter]);


api.listen(PORT, () => {
  console.log("Listeing on port", PORT);
});
