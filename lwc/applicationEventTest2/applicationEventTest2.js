import { LightningElement, api } from 'lwc';

export default class ApplicationEventTest2 extends LightningElement {
    @api name;
    @api gender;
    @api address;
    @api identifier;
    @api divColor;

    connectedCallback(){ 
        this.setGenderColor();
    }

    setGenderColor(){
        console.log("setGenderColor 1");
        if(this.gender == "Male"){
            this.divColor = "maleColor";
        }
        else{
            this.divColor = "femaleColor";
        }
        console.log("setGenderColor 2");
    }

    deleteData(){
        console.log("deleteData 1");
        const event = new CustomEvent('detaildelete', {
            detail: {
                dataId : this.identifier
            }
        });
        //fire event
        this.dispatchEvent(event);
        console.log("deleteData 2");
    }
}