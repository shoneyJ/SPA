const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();
var cors = require("cors");

app.use(cors());
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "hms",
});

/* Ensure any requests prefixed with /static will serve our "frontend/static" directory */
app.get('', (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
app.use(
  "/css",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/jquery/dist"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/datatables.net/js"))
);

app.use("/static", express.static(path.resolve(__dirname, "public", "static")));
app.use(
  "/services",
  express.static(path.resolve(__dirname, "src", "services"))
);
app.use("/views", express.static(path.resolve(__dirname, "public", "views")));
//app.use('/assets', express.static(__dirname + '/node_modules/mysql/'));

/* Redirect all routes to our (soon to exist) "index.html" file */
app.get("/Settings", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.get("/Dashboard", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
// app.use(express.static(path.join(__dirname,'/public/')));
// router.get('/',async (req,res)=>{
//    const service= await hotelService.getHotels();
//     res.send(service.data);

// });
// router.get('/Dashboard',function(req,res){
//     res.sendFile(path.join(__dirname+'/public/views/dashboard.html'));
//   });
// app.use('/', router);
app.listen(PORT, () => {
  console.log("Listeing on port", PORT);
});
