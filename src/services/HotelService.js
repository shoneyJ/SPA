import CommonServices from "./CommonServices.js";

export default class  HotelService extends CommonServices
{  constructor(){
    super();
}
   getHotels(){

    var url='http://localhost:3200/api/hotels';
    return this.getCallAjax(url);

   }

   getHtml(){

    var file='./views/settings.html';
    return this.readHtml(file)

   }
}