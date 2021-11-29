import AbstractView  from "./AbstractView.js";

export default class Dashboard extends AbstractView{

    constructor(){
        super();

        this.setTitle("Dashboard");
    }

    async getHtml(){

        return '<h1>Dashboard</h1>'

    }
}