import AbstractView from "./AbstractView.js";
import HotelService from "../../../../services/HotelService.js";
import RoomService from "../../../../services/RoomService.js";
export default class Settings extends AbstractView {
  constructor() {
    super();
    this.Data=[];
    this.hotelService = new HotelService();
    this.roomService = new RoomService();
    this.setTitle("Settings");
    this.dataPromise = this.hotelService.getHotels();
    this.htmlPromise = this.hotelService.getHtml();
    this.loadHtmlPromise = this.loadHtml();
    //this.dataPromiseRoom=this.roomService.getRoomType();
    this.loadHtmlPromise.then(() => {
      this.init();
      this.events();
    });
  }
  async loadHtml() {
    return await Promise.all([this.dataPromise, this.htmlPromise])
      .then(([data, html]) => {
        if (data.length > 0) {
          for (const [key, value] of Object.entries(data[0])) {
            html = html.replaceAll(`%${key}%`, value);
          }
        }
        document.querySelector("#app").innerHTML = html;
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  init() {
    
      $('#tblRoomType').DataTable({
        "serverSide": true,
        "ajax": "http://localhost:3200/api/rooms/types",      
        columns: [
            { title: "Base Price",
            "data": "base_price" ,
           },
            { title: "Type", 
            "data": "type"  },
           
        ],
        "initComplete": function(settings, json) {
                   $.each(json.data , function (i, item) {
            $('#ddlRoomtype').append($('<option>', { 
                value: item.id,
                text : item.type 
            }));
        });
        }
    })

    $('#tblSpecialLocation').DataTable({
      "serverSide": true,
      "ajax": "http://localhost:3200/api/speciallocation",      
      columns: [
        { title: "Hike Percentage",
        "data": "hike_percent" ,
       },
        { title: "Location Name", 
        "data": "location_value"  },
         
      ],
      "initComplete": function(settings, json) {
        console.log(json.data)
        $.each(json.data , function (i, item) {
 $('#ddlSpecialLocation').append($('<option>', { 
     value: item.id,
     text : item.location_value 
 }));
});
}
  });

  $('#tblSpecialDate').DataTable({
    "serverSide": true,
    "ajax": "http://localhost:3200/api/specialdate",      
    columns: [
     
      { title: "Date", 
      "data": "date"  },
      { title: "Hike Percentage",
      "data": "hike_percent" ,
     },
       
    ]
});


$('#tblServiceType').DataTable({
  "serverSide": true,
  "ajax": "http://localhost:3200/api/service",      
  columns: [
    { title: "Service Type",
    "data": "service_type" ,
   },
    { title: "BasePrice", 
    "data": "price"  },
  ]
});


$('#tblRoom').DataTable({
  "serverSide": true,
  "ajax": "http://localhost:3200/api/room",      
  columns: [
   
    { title: "Id", 
    "data": "id"  },
    { title: "Floor Number",
    "data": "floor_number" ,
   },
   { title: "Room type",
    "data": "roomtype" ,
   },
   { title: "Location",
   "data": "Location_value" ,
  },
     
  ]
});

  }

  events() {
    const btnAddRoomType = document.getElementById("btnAddRoomType");
    const basePrice = document.getElementById("basePrice");
    const roomType = document.getElementById("roomType");

    const btnAddSpecialLocation = document.getElementById("btnAddSpecialLocation");
    const hikePercent = document.getElementById("hikePercent");
    const specialLocation = document.getElementById("inputSpecialLocation");
    const baseSPrice =  document.getElementById("baseSPrice");
    const ServiceType =  document.getElementById("ServiceType");

    btnAddRoomType.addEventListener("click", (event) => {
      this.roomService.addRoomType({
        base_price: basePrice.value,
        room_type: roomType.value,
      });
    });

    btnAddSpecialLocation.addEventListener("click", (event) => {
      this.roomService.addSpecialLocation({
        hike_percent: hikePercent.value,
        location_value: specialLocation.value,
      });
    });

    document.getElementById("btnAddSpecialDate").addEventListener("click", (event) => {
      this.roomService.addSpecialDate({    
        date:  document.getElementById("inputDate").value,
        hike_percent: document.getElementById("txtspecialDateHikePercent").value,
      });
    });


    document.getElementById("btnAddRoom").addEventListener("click", (event) => {
      this.roomService.addRoom({    
        floor_number:  document.getElementById("roomFloor").value,
        room_type_id: document.getElementById("ddlRoomtype").value,
        special_location_id:document.getElementById("ddlSpecialLocation").value
      });
    });

    document.getElementById("btnAddServiceType").addEventListener("click", (event) => {
      this.roomService.addService({    
        baseSPrice:  baseSPrice.value,
        ServiceType: ServiceType.value,
      });
    });
   
   
  }
}
