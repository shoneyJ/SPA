import AbstractView from "./AbstractView.js";
import HotelService from "../../../../services/HotelService.js";
import RoomService from "../../../../services/RoomService.js";
export default class Settings extends AbstractView {
  constructor() {
    super();
    this.hotelService = new HotelService();
    this.roomService = new RoomService();
    this.setTitle("Settings");
    this.dataPromise = this.hotelService.getHotels();
    this.htmlPromise = this.hotelService.getHtml();
    this.loadHtmlPromise = this.loadHtml();

    this.loadHtmlPromise.then(() => {
      this.events();
    });
  }
  async loadHtml() {
    return await Promise.all([this.dataPromise, this.htmlPromise]).then(
      ([data, html]) => {
        for (const [key, value] of Object.entries(data[0])) {
          html = html.replaceAll(`%${key}%`, value);
        }
        document.querySelector("#app").innerHTML = html;
      }
    );
  }

  events() {
    const btnAddRoomType = document.getElementById("btnAddRoomType");
    const basePrice = document.getElementById("basePrice");
    const roomType = document.getElementById("roomType");

    btnAddRoomType.addEventListener("click", (event) => {
      this.roomService.addRoomType({
        id: 400,
        base_price: basePrice.value,
        room_type: roomType.value,
      });
    });
  }
}
