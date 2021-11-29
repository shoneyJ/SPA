export default class AbstractView {

    constructor (title){
        this.title=title;
    }

    setTitle(title){

        document.title=title;
    }

    async getHtml(){
        return '';
    }
}