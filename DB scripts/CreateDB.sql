CREATE TABLE `hotel` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100)  NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `special_location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hike_percent` int NOT NULL,
  `location_value` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE `room_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `base_price` float NOT NULL,
  `type` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(25)  NOT NULL,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `service_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `service_type` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `special_date` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `hike_percent` int NOT NULL,
  PRIMARY KEY (`id`)
) 




CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `staff` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(25),  
  `department_id` int NOT NULL ,
  PRIMARY KEY (`id`),

  CONSTRAINT `fk_department` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
) 
CREATE TABLE `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `floor_number` int NOT NULL,
  `occupancy_status` bit DEFAULT 1 NOT NULL,
  `room_type_id` int NOT NULL,
  `special_location_id` int NOT NULL,
  PRIMARY KEY (`id`),  
  CONSTRAINT `fk_room_type` FOREIGN KEY (`room_type_id`) REFERENCES `room_type` (`id`),
  CONSTRAINT `fk_special_location` FOREIGN KEY (`special_location_id`) REFERENCES `special_location` (`id`)
) 

CREATE TABLE `availed_service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `completion_status` bit(1) NOT NULL,
  `customer_id` int NOT NULL,
  `room_id` int NOT NULL,
  `service_type_id` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_room` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `fk_servicetype` FOREIGN KEY (`service_type_id`) REFERENCES `service_type` (`id`),
  CONSTRAINT `fk_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) 

CREATE TABLE `billing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total_price` float NOT NULL,
  `customer_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_billingcustomer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) 

CREATE TABLE `booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_source` varchar(50) DEFAULT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `customer_id` int NOT NULL,
  `staff_id` int NOT NULL,
  PRIMARY KEY (`id`),

  CONSTRAINT `fk_bookingstaff` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`),
  CONSTRAINT `fk_bookingcustomer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
) 



CREATE TABLE `customer_rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `room_id` int NOT NULL,
  PRIMARY KEY (`id`),

  CONSTRAINT `fk_customer_room_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  CONSTRAINT `fk_customer_room_room` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) 



CREATE TABLE `parking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parking_slot_availability` bit(1) NOT NULL,
  `parking_slot_number` int NOT NULL,
  `time_of_departure` date DEFAULT NULL,
  `time_of_parking` date DEFAULT NULL,
  `vehicle_platenumber` varchar(10)   DEFAULT NULL,
  `customer_id` int NOT NULL,
  `staff_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
 
  CONSTRAINT `fk_parkingcustomer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  CONSTRAINT `fk_parkingstaff` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`)
) 


CREATE TABLE `title` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title_name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) 

ALTER TABLE customer
ADD COLUMN title_id INT AFTER id
 
 
ALTER TABLE customer 
ADD CONSTRAINT fk_title FOREIGN KEY (title_id) REFERENCES title(id);

ALTER TABLE customer
ADD COLUMN first_name VARCHAR(15) AFTER title_id;



ALTER TABLE customer
ADD COLUMN last_name VARCHAR(15) AFTER first_name;

ALTER TABLE customer
ADD COLUMN dateofbirth  date AFTER last_name;


ALTER TABLE customer
ADD COLUMN dateofbirth  date AFTER last_name;

ALTER TABLE customer
MODIFY COLUMN first_name VARCHAR(15) NOT NULL;

ALTER TABLE customer
MODIFY COLUMN last_name VARCHAR(15) NOT NULL;

ALTER TABLE customer
ADD COLUMN emailid VARCHAR(20) AFTER last_name;

ALTER TABLE customer
ADD COLUMN information VARCHAR(200) AFTER emailid;

CREATE TABLE `customer_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `address` varchar(500),
  `city` varchar(25),
  `country` varchar(25),
  `address_type` varchar(25),
  PRIMARY KEY (`id`),
 
  CONSTRAINT `fk_customer_details_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`)
); 

ALTER TABLE customer_details
ADD COLUMN phone VARCHAR(20) AFTER customer_id;

CREATE TABLE `booking_room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int NOT NULL,
  `room_id` int not null,
 
  PRIMARY KEY (`id`),
 
  CONSTRAINT `fk_booking_room_booking` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`id`),
  CONSTRAINT `fk_booking_room_room` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
);

ALTER TABLE booking
ADD COLUMN booking_date datetime AFTER id;


ALTER TABLE booking
MODIFY COLUMN check_in_date datetime NOT NULL;

ALTER TABLE booking
MODIFY COLUMN check_out_date datetime NULL;


ALTER TABLE customer
DROP COLUMN name;

INSERT INTO  `title`
(
`title_name`)
VALUES
('Mr');

INSERT INTO  `title`
(
`title_name`)
VALUES
('Mrs');





