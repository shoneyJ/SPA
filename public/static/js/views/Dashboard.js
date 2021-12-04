import AbstractView  from "./AbstractView.js";
import CommonServices from "../../../services/CommonServices.js";
import RoomService from "../../../../services/RoomService.js";
export default class Dashboard extends AbstractView{

    constructor(){
        super();
        this.CommonServices = new CommonServices();
        this.roomService = new RoomService();
        this.htmlPromise = this.CommonServices.readHtml('./views/dashboard.html');
        this.loadHtmlPromise = this.loadHtml();
        this.loadHtmlPromise.then(() => {
            this.init();
            this.events();
          });
        this.setTitle("Dashboard");
        this.apiBaseUrl='http://localhost:3200/api/';
    }

    init(){

      this.CommonServices.getCallAjax(this.apiBaseUrl+'customer').then((result)=>{
        $.each(result.data , function (i, item) {
          $('#existingcustomer').append($('<option>', { 
              value: item.id,
              text :  item.first_name+' '+item.last_name
          }));
      });
    })


      this.CommonServices.getCallAjax(this.apiBaseUrl+'title').then((result)=>{
        $.each(result.data , function (i, item) {
          $('#title').append($('<option>', { 
              value: item.id,
              text :  item.title_name
          }));
      });


      });

        this.roomService.getRooms().then((result)=>{
            
            $.each(result.data , function (i, item) {
                $('#room').append($('<option>', { 
                    value: item.id,
                    text : item.id +' '+item.roomtype+' '+item.Location_value
                }));
            });
     
        });

        
    }

    events(){

      document.getElementById('btnbook').addEventListener("click", (event) => {
          var customerbooking={
            customer_id:document.getElementById('existingcustomer').value,
            title_id :document.getElementById('title').value,
            first_name:document.getElementById('firstName').value,
            last_name:document.getElementById('lastName').value,
            emailid:document.getElementById('email').value,
            information:document.getElementById('information').value,
            check_in_date:  document.getElementById('checkindate').value,
            check_out_date: document.getElementById('checkoutdate').value,
            room_list:$('#room').val().toString()
          }
          this.CommonServices.postCallAjax(this.apiBaseUrl+'customerbooking',customerbooking).then((result)=>{

          alert('Booked Successfully');

          });
      
      });

    }


    addBooking(customerid){


      var booking=
      {
        customer_id:  customerid,
        check_in_date:  document.getElementById('checkindate').value,
        check_out_date: document.getElementById('checkoutdate').value
      }
      this.CommonServices.postCallAjax(this.apiBaseUrl+'book',booking).then((result)=>{

      var bookmaproom={
        booking_id:result.bookingid,
        room_id:document.getElementById('room').value
      }

      this.CommonServices.postCallAjax(this.apiBaseUrl+'bookmaproom',bookmaproom).then((result)=>{

      });
    });
    }

    async loadHtml() {
        return await Promise.all([this.htmlPromise])
          .then(([html]) => {            
            document.querySelector("#app").innerHTML = html;
          })
          .catch((error) => {
            console.error(error.message);
          });
      }
}