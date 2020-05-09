import { LightningElement, api } from 'lwc';

export default class ChildComponentEventTest extends LightningElement {
    sendData(evt){
        //create event
        const event = new CustomEvent('sendmydata', {
            detail: {
                name : "Kratos",
                address : "Spart",
                gender : "Male"
            }
        });
        //fire event
        this.dispatchEvent(event);
    }

    @api
    notifyChildFromParent(){
        console.log("notifyChildFromParent 1");
        this.template.querySelector('.isDataSent').innerHTML = "<b>Data Successfully Sent To Parent !</b>";
        console.log("notifyChildFromParent 2");
    }

    @api
    displayMessageFromGrandParent(aMessage){
        console.log("displayMessageFromGrandParent 1");
        if(aMessage != null){
            this.template.querySelector('.messageFromGrandParent').innerHTML = "<b>" + aMessage + "</b>";
        }
        console.log("displayMessageFromGrandParent 2");
    }
}