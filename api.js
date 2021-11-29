
const express= require('express');
const cors = require('cors');
const mysql = require('mysql');
const { application, json } = require('express');

const api = express();
const PORT= 3200;

api.use(cors());
api.use(express.json());
api.use(express.urlencoded({extends:true})); //Parse URL-encoded bodies

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database:'hms'
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  
  const hotelRouter= require('./apiroutes/hotelRouter')(con);

api.use('/api',hotelRouter);

  

  
api.listen(PORT,()=>{

    console.log('Listeing on port', PORT);
})