import CommonServices from "./CommonServices.js";

export default class RoomService extends CommonServices {
  constructor() {
    super();
  }
  getRoomType() {
    var url = "http://localhost:3200/api/rooms/types";
    return this.getCallAjax(url);
  }

  addRoomType(data) {
    var url = "http://localhost:3200/api/rooms/types";
    return this.postCallAjax(url, data);
  }

  addSpecialLocation(data) {
    var url = "http://localhost:3200/api/speciallocation";
    return this.postCallAjax(url, data);
  }

  addSpecialDate(data) {
    var url = "http://localhost:3200/api/specialdate";
    return this.postCallAjax(url, data);
  }


  addService(data) {
    var url = "http://localhost:3200/api/service";
    return this.postCallAjax(url, data);
  }
  getService() {
    var url = "http://localhost:3200/api/service";
    return this.getCallAjax(url);
  }

  addRoom(data) {
    var url = "http://localhost:3200/api/room";
    return this.postCallAjax(url, data);
  }
  getRooms() {
    var url = "http://localhost:3200/api/room";
    return this.getCallAjax(url);
  }
}
