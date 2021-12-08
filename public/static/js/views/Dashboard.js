import AbstractView  from "./AbstractView.js";
import CommonServices from "../../../services/CommonServices.js";
import RoomService from "../../../../services/RoomService.js";
export default class Dashboard extends AbstractView{

  
    constructor(){
        super();
       this.customer=[];
       this.selectedCustomerId=0;
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

      $.each(result.data , function (i, item) {
        $('#billing-existingcustomer').append($('<option>', { 
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

        this.roomService.getService().then((result)=>{
            
          $.each(result.data , function (i, item) {
              $('#service').append($('<option>', { 
                value: item.id,
                text : item.service_type
              }));
          });
   
      });
        document.getElementById('btncustomer').addEventListener("click",(event)=>{

          this.CommonServices.putCallAjax(
      
            this.apiBaseUrl+'customer',
              {
                id:Dashboard.selectedCustomerId,
                first_name: document.getElementById('profile-firstName').value,
                last_name: document.getElementById('profile-lastName').value,
                emailid: document.getElementById('profile-email').value
              }).then (()=>{
      
                alert('Customer updated succesfully')
              })      
        })  
        
    }

    events(){
      var triggerTabList = [].slice.call(document.querySelectorAll('#myTab button'));
        
      triggerTabList.forEach(function (triggerEl) {
        var tabTrigger = new bootstrap.Tab(triggerEl)

      triggerEl.addEventListener('click', function (event) {
            event.preventDefault()
      tabTrigger.show()
      })

  
});



document.getElementById('profile-tab').addEventListener("click",(event)=>{
  if(!$.fn.dataTable.isDataTable( '#tblCustomer' ) ){
      var table = $('#tblCustomer').DataTable({
    "serverSide": true,
    "ajax": "http://localhost:3200/api/customer",      
    columns: [
      { title: "First Name",
      "data": "first_name" ,
     },
     { title: "Last Name",
     "data": "last_name" ,
    }, 
    { title: "Email Id",
    "data": "emailid" ,
   },  
   { title: "Date of birth",
    "data": "dateofbirth" ,
   },  
   { title: "Information",
   "data": "information" ,
  }, 
  { title: "Edit",
  "render": function ( data, type, row, meta ) {

    return `<button type="button" id="editCustomer" data-customer=`+row.id+` class="btn btn-default btn-sm">Edit
  </button>`;
     
  }
 },],

 "initComplete": function(settings, json) {
  Dashboard.customers=json.data;

}
  });
  table.on( 'click','button', function (  e, dt, type, indexes ) {
    console.log(this );
    Dashboard.selectedCustomerId=this.dataset.customer;
    var customer=Dashboard.customers.find(x=>x.id==this.dataset.customer);    
    document.getElementById('profile-firstName').value=customer.first_name;
    document.getElementById('profile-lastName').value=customer.last_name;
    document.getElementById('profile-email').value=customer.emailid;
  } );
}
});



$( "#billing-existingcustomer" ).on('change',()=> {

  var url="http://localhost:3200/api/billing/"+ $('#billing-existingcustomer').val();
console.log( url);

  if(!$.fn.dataTable.isDataTable( '#tblBilling' ) ){
    Dashboard.tblBilling = $('#tblBilling').DataTable({
  "serverSide": true,
  "ajax":url ,      
  columns: [
    { title: "Date Of Booking",
    "data": "booking_date" ,
   },
  
  { title: "Customer name",
  "data": "customer_name" ,
 },
  { title: "Amount",
  "data": "total_price" ,
 },  
 { title: "Payment Status",
  "data": "state" ,
 },  
 
  { title: "Edit",
  "render": function ( data, type, row, meta ) {

    return `<button type="button"  data-bookingid=`+row.booking_id+` class="btn btn-default btn-sm">Edit
  </button>`;
   
  }
 },

],

"initComplete": function(settings, json) {
Dashboard.billing=json.data;

}
});
Dashboard.tblBilling.on( 'click','button', function (  e, dt, type, indexes ) {
  console.log(this );
  Dashboard.selectedBookingId=this.dataset.bookingid;
  var booking=Dashboard.billing.find(x=>x.booking_id==this.dataset.bookingid);    
  document.getElementById('billing-amount').innerHTML=booking.total_price;

} );
}else
Dashboard.tblBilling.ajax.reload();
});


document.getElementById('btnbilling').addEventListener("click",(event)=>{

  this.CommonServices.putCallAjax(
      
    this.apiBaseUrl+'billing/'+$('#billing-existingcustomer').val(),
      {
        booking_id:Dashboard.selectedBookingId,
        state: $('#select-billing-status').val(),
       
      }).then (()=>{

        alert('Billing updated succesfully')
      }) 

});

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
            room_list:$('#room').val().toString(),
            service_list:$('#service').val().toString(),
            staff_id:1,
            no_of_people:$('#noofpeople').val()
          }
          this.CommonServices.postCallAjax(this.apiBaseUrl+'customerbooking',customerbooking).then((result)=>{

          alert('Booked Successfully');

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