const express= require('express');

function routes (con){
 const hotelRouter= express.Router();
     hotelRouter.route('/hotels')
    .get((req,res)=>{
          let sql = `CALL GetAllHotel();`;
          con.query(sql, true, (error, results, fields) => {
            if (error) {
              return console.error(error.message);
             }  
               res.json(results[0])

})
});

hotelRouter.route('/rooms/types')
.get((req,res)=>{
      let sql = `CALL sp_GetRoomTypes();`;
      con.query(sql, true, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
         }  
           res.json(results[0])

});
})
.post((req,res)=>{

  let sql = `CALL sp_InsertRoomTypes(?,?,?);`;
  const roomType=req.body; 
  var sqlCall = con.query('call sp_InsertRoomTypes(?, ?, ?)', [roomType.id, roomType.base_price, roomType.room_type], function(err, result) { 
  if (err) throw err; 
  console.log(result.insertId); 
});
res.json(req.body)
})

return hotelRouter;

}

module.exports=routes;