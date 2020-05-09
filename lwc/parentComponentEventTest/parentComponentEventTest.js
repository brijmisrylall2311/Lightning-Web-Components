import { LightningElement, api } from 'lwc';

export default class ParentComponentEventTest extends LightningElement {
    @api childDetailsName;
    @api childDetailsGender;
    @api childDetailsAddress;
    handleChildEvent(evt){
        console.log("Handle Child Event 1");
        this.childDetailsName = evt.detail.name;
        this.childDetailsGender = evt.detail.gender;
        this.childDetailsAddress = evt.detail.address;
        this.sendOkToChildren();
        this.sendDetailsToGrandParent();
        console.log("Handle Child Event 2");
    }
    sendDetailsToGrandParent(evt){
            console.log("sendDetailsToGrandParent 1");
            //create event
            const event = new CustomEvent('sendtograndparent', {
                detail: {
                    name : this.childDetailsName,
                    address : this.childDetailsAddress,
                    gender : this.childDetailsGender
                }
            });
            //fire event
            this.dispatchEvent(event);
            console.log("sendDetailsToGrandParent 2");
    }

    @api
    notifyParentFromGrandParent(){
        console.log("notifyParentFromGrandParent 1");
        this.template.querySelector('.isDataSent').innerHTML = "<b>Data Successfully Sent To Grand Parent !</b>";
        console.log("notifyParentFromGrandParent 2");
    }

    sendOkToChildren(){
        console.log("sendOkToChildren 1");
        this.template.querySelector('c-child-component-event-test').notifyChildFromParent();
        console.log("sendOkToChildren 2");
    }

    @api
    displayGrandParentMessageToChild(aMessage){
        console.log("displayGrandParentMessageToChild 1");
        if(aMessage != null){
            this.template.querySelector('c-child-component-event-test').displayMessageFromGrandParent(aMessage);
        }
        console.log("displayGrandParentMessageToChild 2");
    }
}