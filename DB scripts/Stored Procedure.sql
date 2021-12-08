DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllHotel`()
BEGIN
	SELECT id,name  FROM hotel;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetRoomTypes`()
BEGIN
    select id,base_price,type from room_type;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertRoomTypes`(IN id int, IN baseprice int,IN roomtype nvarchar(25))
BEGIN
    INSERT INTO `room_type`
(
`base_price`,
`type`)
VALUES
(
baseprice,
roomtype);


END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetSpecialLocations`()
BEGIN
   select id,hike_percent,location_value from special_location;

END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertSpecialLocation`(IN hike_percent int,IN location_value varchar(100))
BEGIN
   INSERT INTO  `special_location`
(
`hike_percent`,
`location_value`)
VALUES
(
hike_percent,
location_value);


END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetSpecialDate`()
BEGIN
    SELECT `id`,
     `date`,
     `hike_percent`
FROM  `special_date`;


END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertSpecialDate`(IN `date` date,IN hike_percent int)
BEGIN
INSERT INTO  `special_date`
(
`date`,
`hike_percent`)
VALUES
(
date,
hike_percent);



END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetRooms`()
SELECT 
	R.`id`,
    R.`floor_number`,
    R.`occupancy_status`,
	R.`room_type_id`,
    R.`special_location_id`,
    RT.type AS roomtype,
    SL.Location_value
    
FROM room R, room_type RT,Special_Location SL ;


END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertRoom`(IN `floor_number` int,IN occupancy_status bit,IN room_type_id int, IN special_location_id int)
BEGIN

INSERT INTO  `room`
( `floor_number`,
`occupancy_status`,
`room_type_id`,
`special_location_id`)
VALUES
 (
floor_number,
occupancy_status,
room_type_id,
special_location_id);

END$$
DELIMITER ;




DELIMITER $$
DROP PROCEDURE IF EXISTS GetRooms $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetRooms`()

SELECT 
	R.`id`,
    R.`floor_number`,
    R.`occupancy_status`,
	R.`room_type_id`,
    R.`special_location_id`,
    RT.type AS roomtype,
    SL.Location_value    
FROM room R
LEFT JOIN  room_type RT on R.room_type_id=RT.id
LEFT JOIN Special_Location SL on R.special_location_id=SL.id;


END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertRoom`(IN `floor_number` int,IN room_type_id int, IN special_location_id int)
BEGIN

INSERT INTO  `room`
( `floor_number`,
`room_type_id`,
`special_location_id`)
VALUES
 (
floor_number,
room_type_id,
special_location_id);

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetDepartments`()

SELECT `department`.`id`,
    `department`.`department_name`
FROM `department`;


END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertDepartment`(IN department_name varchar(100))

INSERT INTO  `department`
( `department_name`)
VALUES
( department_name);

END$$
DELIMITER 


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetStaffs`()

SELECT S.`id`,
	S.`name`,
    S.`department_id`,
    D.department_name
FROM staff S,department D;



END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertStaff`(IN name varchar(25), IN department_id int)

INSERT INTO `staff`
(
`name`,
`department_id`)
VALUES
(
name,
department_id);

END$$
DELIMITER 


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetCustomers`()

SELECT `id`,
    `title_id`,
    `first_name`,
    `last_name`,
    `emailid`,
    `information`,
    `dateofbirth`
  
FROM  `customer`;



END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTitles`()

SELECT   `id`,
		`title_name`
FROM  `title`;


END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddBooking`(IN customer_id INT,IN check_in_date datetime,IN check_out_date datetime)

INSERT INTO  `booking`
( 
`booking_date`,
`booking_source`,
`check_in_date`,
`check_out_date`,
`customer_id`,
`staff_id`)
VALUES
( 
Now(),
'Online',
check_in_date,
check_out_date,
customer_id,
1);



END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddCustomer`(IN title_id INT,IN first_name varchar(15),IN last_name varchar(15),IN emailid varchar(20),IN information varchar(200),IN dateofbirth datetime,IN check_out_date datetime)
BEGIN
DECLARE l_student_id INT DEFAULT 0;
	START transaction;
	INSERT INTO `customer`
	(
	`title_id`,
	`first_name`,
	`last_name`,
	`emailid`,
	`information`,
	`dateofbirth`
	)
	VALUES
	(
	title_id,
	first_name,
	last_name,
	emailid,
	information,
	dateofbirth
	);

 SET l_student_id = LAST_INSERT_ID();


END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `MapBookingRoom`(IN booking_id INT,IN room_id INT)

INSERT INTO  `booking_room`
( 
`booking_id`,
`room_id`)
VALUES
(
booking_id,
room_id);



END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetCustomers`()

SELECT  `id`,
     `title_id`,
    `first_name`,
     `last_name`,
     `emailid`,
    `information`,
     `dateofbirth`
    
FROM  `customer`;

END$$
DELIMITER ;




DELIMITER $$
DROP PROCEDURE IF EXISTS MapBookingRooms $$
CREATE PROCEDURE MapBookingRooms(IN booking_in int, _list  varchar(100))
BEGIN

DECLARE _next TEXT DEFAULT NULL;
DECLARE _nextlen INT DEFAULT NULL;
DECLARE _value TEXT DEFAULT NULL;
iterator:
LOOP
  -- exit the loop if the list seems empty or was null;
  -- this extra caution is necessary to avoid an endless loop in the proc.
  IF CHAR_LENGTH(TRIM(_list)) = 0 OR _list IS NULL THEN
    LEAVE iterator;
  END IF;
 
  -- capture the next value from the list
  SET _next = SUBSTRING_INDEX(_list,',',1);

  -- save the length of the captured value; we will need to remove this
  -- many characters + 1 from the beginning of the string 
  -- before the next iteration
  SET _nextlen = CHAR_LENGTH(_next);

  -- trim the value of leading and trailing spaces, in case of sloppy CSV strings
  SET _value = TRIM(_next);

  -- insert the extracted value into the target table
INSERT INTO `booking_room`
 (
`booking_id`,
`room_id`)
VALUES
(booking_in,
_value);

  -- rewrite the original string using the `INSERT()` string function,
  -- args are original string, start position, how many characters to remove, 
  -- and what to "insert" in their place (in this case, we "insert"
  -- an empty string, which removes _nextlen + 1 characters)
  SET _list = INSERT(_list,1,_nextlen + 1,'');
END LOOP;


END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS AddCustomerAddBooking $$
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddCustomerAddBooking`
(IN customer_id INT,
IN title_id INT,
IN first_name varchar(15),
IN last_name varchar(15),
IN emailid varchar(20),
IN information varchar(200),
IN dateofbirth datetime,
IN check_in_date datetime,
IN check_out_date datetime,
IN room_list  varchar(100),
IN service_list varchar(100),
IN staff_id INT,
IN no_of_people INT)

BEGIN
DECLARE l_customer_id INT;
DECLARE l_booking_id INT DEFAULT 0;
SET l_customer_id=customer_id;
	START transaction;
    
    if l_customer_id=0 THEN
			INSERT INTO `customer`
			(
			`title_id`,
			`first_name`,
			`last_name`,
			`emailid`,
			`information`,
			`dateofbirth`
			)
			VALUES
			(
			title_id,
			first_name,
			last_name,
			emailid,
			information,
			dateofbirth
			);

		 SET l_customer_id = LAST_INSERT_ID();
	end if;
 IF l_customer_id > 0 THEN
	INSERT INTO  `booking`
		( 
		`booking_date`,
		`booking_source`,
		`check_in_date`,
		`check_out_date`,
		`customer_id`,
		`staff_id`,
        `no_of_people`)
		VALUES
		( 
		Now(),
		'Online',
		check_in_date,
		check_out_date,
		l_customer_id,
		staff_id,
        no_of_people);
         SET l_booking_id = LAST_INSERT_ID();
         
         call MapBookingRooms(l_booking_id,room_list);
		 call MapBookingService(l_booking_id,service_list);
         call CalculatePrice(l_booking_id,l_customer_id);
        -- commit
        COMMIT;
     ELSE
	ROLLBACK;
    END IF;
		

END$$
DELIMITER ;

DROP procedure IF EXISTS `EditCustomer`;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `EditCustomer`(
IN id INT,
IN first_name varchar(15),
IN last_name varchar(15),
IN emailid varchar(20)
)

UPDATE  customer c
SET
c.first_name = first_name,
c.last_name =last_name,
c.emailid = emailid
WHERE c.id =id;

END$$
DELIMITER ;





DELIMITER $$
USE `hmsneu`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `CalculatePrice`(IN BookingID int, IN CustomerID INT)
Begin
DECLARE TotalBasePrice Float;
DECLARE TotaleServiceHike  INT;
DECLARE TotaleLocationHike  INT;
DECLARE NumberOfDays  INT;
DECLARE FinalPrice  float;
Select SUM(base_price) INTO TotalBasePrice FROM room_type RT LEFT JOIN  room R on R.room_type_id=RT.id LEFT JOIN  booking_room BR on BR.room_id=R.id LEFT JOIN booking B on B.id =  BR.booking_id where BR.booking_id = BookingID and B.customer_id = CustomerID;
Select SUM(price) INTO TotaleServiceHike FROM service_type ST LEFT JOIN booking_service BS on ST.id = BS.service_id LEFT JOIN booking B on B.id =  BS.booking_id where BS.booking_id=BookingID and B.customer_id = CustomerID;
Select SUM(hike_percent) INTO TotaleLocationHike FROM special_location SL LEFT JOIN room R on R.special_location_id = SL.id LEFT JOIN booking_room BR on BR.room_id=R.id LEFT JOIN booking B on B.id =  BR.booking_id where B.customer_id = CustomerID and BR.booking_id = BookingID;
Select DATEDIFF(check_out_date,check_in_date) INTO NumberOfDays from booking B where B.customer_id = CustomerID;
Set FinalPrice = (TotalBasePrice * (((TotaleServiceHike + TotaleLocationHike)/100 + 1))) * NumberOfDays;

INSERT INTO billing (total_price,customer_id,booking_id) VALUES (FinalPrice, CustomerID,BookingID);
END$$

DELIMITER ;
;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetServiceTypes`()
BEGIN
    select id,service_type,price from service_type;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertServiceTypes`(IN service_type nvarchar(25),IN price int)
BEGIN
    INSERT INTO `service_type`
(
`service_type`,
`price`)
VALUES
(
service_type,
price);


END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `MapBookingService`(IN booking_in int, _list  varchar(100))
BEGIN

DECLARE _next TEXT DEFAULT NULL;
DECLARE _nextlen INT DEFAULT NULL;
DECLARE _value TEXT DEFAULT NULL;
iterator:
LOOP
  -- exit the loop if the list seems empty or was null;
  -- this extra caution is necessary to avoid an endless loop in the proc.
  IF CHAR_LENGTH(TRIM(_list)) = 0 OR _list IS NULL THEN
    LEAVE iterator;
  END IF;
 
  -- capture the next value from the list
  SET _next = SUBSTRING_INDEX(_list,',',1);

  -- save the length of the captured value; we will need to remove this
  -- many characters + 1 from the beginning of the string 
  -- before the next iteration
  SET _nextlen = CHAR_LENGTH(_next);

  -- trim the value of leading and trailing spaces, in case of sloppy CSV strings
  SET _value = TRIM(_next);

  -- insert the extracted value into the target table
INSERT INTO `booking_service`
 (
`booking_id`,
`service_id`)
VALUES
(booking_in,
_value);

  -- rewrite the original string using the `INSERT()` string function,
  -- args are original string, start position, how many characters to remove, 
  -- and what to "insert" in their place (in this case, we "insert"
  -- an empty string, which removes _nextlen + 1 characters)
  SET _list = INSERT(_list,1,_nextlen + 1,'');
END LOOP;


END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetBillingByCustomer`(IN customer_id INT)
BEGIN
    SELECT B.`id`,
    B.`total_price`,
    B.`customer_id`,
    B.`booking_id`,
    B.`state`,
    CONCAT(C.first_name,' ', C.last_name) AS customer_name,
    BK.booking_date,
    B.state
    
FROM `billing` B
LEFT JOIN customer C on C.id=B.customer_id
LEFT JOIN booking BK on BK.id=B.booking_id
WHERE  B.`customer_id`=customer_id;

END$$
DELIMITER ;


DROP procedure IF EXISTS `EditBilling`;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `EditBilling`(
IN booking_id INT,
IN customer_id INT,
IN state varchar(10)
)
BEGIN
UPDATE `billing` B
SET
B.`state` = state
WHERE B.booking_id =booking_id AND B.customer_id=customer_id;

END$$
DELIMITER ;


