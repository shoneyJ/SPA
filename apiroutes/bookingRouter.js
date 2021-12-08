const express = require("express");

function bookingRouter(con){

    const routers = express.Router();

    routers
    .route("/book")
    .get((req, res) => {
      console.log("got the location")  
      let sql = `CALL GetSpecialLocations();`;
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
        "call InsertSpecialLocation(?, ?)",
        [reqBody.hike_percent, reqBody.location_value],
        function (err, result) {
          if (err) throw err;
        }
      );
      res.json(reqBody);
    });

    routers
    .route("/bookmaproom")
    .get((req, res) => {
      console.log("got the location")  
      let sql = `CALL GetSpecialLocations();`;
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
        "call InsertSpecialLocation(?, ?)",
        [reqBody.hike_percent, reqBody.location_value],
        function (err, result) {
          if (err) throw err;
        }
      );
      res.json(reqBody);
    });

    routers
    .route("/customerbooking")
    // .get((req, res) => {
    //   console.log("got the location")  
    //   let sql = `CALL GetSpecialLocations();`;
    //   con.query(sql, true, (error, results, fields) => {
    //     if (error) {
    //       return console.error(error.message);
    //     }        
    //     var values=results[0];
    //     values=JSON.stringify({data:values});    
       
    //     res.send(values);
    //     //res.json(results[0]);
    //   });
    // })
    .post((req, res) => {
      const reqBody = req.body;
      var sqlCall = con.query(
        "call AddCustomerAddBooking(?,?, ?,?, ?,?, ?,?, ?,?,?,?,?)",
        [reqBody.customer_id,reqBody.title_id, reqBody.first_name,reqBody.last_name,
          reqBody.emailid,reqBody.information,reqBody.dateofbirth,reqBody.check_in_date,reqBody.check_out_date,reqBody.room_list,reqBody.service_list,
          reqBody.staff_id,
          reqBody.no_of_people],
        function (err, result) {
          if (err) throw err;
        }
      );
      res.json(reqBody);
    });

    return routers
}
module.exports = bookingRouter;
