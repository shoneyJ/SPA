const express = require("express");

function routes(con) {
  const hotelRouter = express.Router();
  hotelRouter.route("/hotels").get((req, res) => {
    let sql = `CALL GetAllHotel();`;
    con.query(sql, true, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.json(results[0]);
    });
  });

  hotelRouter
    .route("/rooms/types")
    .get((req, res) => {
      let sql = `CALL GetRoomTypes();`;
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
      const roomType = req.body;
      var sqlCall = con.query(
        "call InsertRoomTypes(?, ?)",
        [roomType.base_price, roomType.room_type],
        function (err, result) {
          if (err) throw err;
        }
      );
      res.json(req.body);
    });


    hotelRouter
    .route("/speciallocation")
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


    hotelRouter
    .route("/specialdate")
    .get((req, res) => {

      let sql = `CALL GetSpecialDate();`;
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
        "call InsertSpecialDate(?, ?)",
        [reqBody.date, reqBody.hike_percent],
        function (err, result) {
          if (err) throw err;
        }
      );
      res.json(reqBody);
    });


    hotelRouter
    .route("/room")
    .get((req, res) => {

      let sql = `CALL GetRooms();`;
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
        "call InsertRoom(?, ?,?)",
        [reqBody.floor_number, reqBody.room_type_id, reqBody.special_location_id],
        function (err, result) {
          if (err) throw err;
        }
      );
      res.json(reqBody);
    });


  return hotelRouter;
}

module.exports = routes;
