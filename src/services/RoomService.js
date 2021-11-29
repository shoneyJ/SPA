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

  //   getHtml() {
  //     var file = "./views/settings.html";
  //     return this.readHtml(file);
  //   }
}
