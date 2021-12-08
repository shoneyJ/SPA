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
        [reqBody.title_id, reqBody.first_name,reqBody.last_name,reqBody.emailid,reqBody.information,reqBody.dateofbirth],
        function (err, result) {
          if (err) throw err;
        }
      );
      res.json(reqBody);
    })
    .put((req, res) => {
      const reqBody = req.body;
      var sqlCall = con.query(
        "call EditCustomer(?,?,?,?)",
        [reqBody.id,reqBody.first_name,reqBody.last_name,reqBody.emailid],
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


    routers
    .route("/billing/:customerId")
    .get((req, res) => {
     
      let sql = `CALL GetBillingByCustomer(?);`;

      con.query(sql,[req.params.customerId],
         (err, results)=> {
          if (err) return console.error(err.message);
          var values=results[0];
          values=JSON.stringify({data:values});    
        res.send(values);
        });
    })
    .put((req, res) => {
      console.log('billing up')
      const reqBody = req.body;
      var sqlCall = con.query(
        "call EditBilling(?,?,?)",
        [reqBody.booking_id,req.params.customerId,reqBody.state],
        function (err, result) {
          if (err) throw err;
        }
      );
      res.json(reqBody);
    });

    return routers
}
module.exports = customerRouter;
