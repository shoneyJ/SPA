const express = require("express");

function customerRouter(con){

    const routers = express.Router();

    routers
    .route("/customer")
    .get((req, res) => {
     
      let sql = `CALL GetCustomers();`;
      con.query(sql, true, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }        
        var values=results[0];
        values=JSON.stringify({data:values});    
       
        res.send(values);
        //res.json(results[0]);
      });
    })
    .post((req, res) => {
      const reqBody = req.body;
      var sqlCall = con.query(
        "call AddCustomer(?, ?,?, ?,?, ?)",
        [reqBody.title_id, reqBody.first_name,last_name,emailid,information,dateofbirth],
        function (err, result) {
          if (err) throw err;
        }
      );
      res.json(reqBody);
    });


    routers
    .route("/title")
    .get((req, res) => {
     
      let sql = `CALL GetTitles();`;
      con.query(sql, true, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }        
        var values=results[0];
        values=JSON.stringify({data:values});    
       
        res.send(values);
        //res.json(results[0]);
      });
    })

    return routers
}
module.exports = customerRouter;
