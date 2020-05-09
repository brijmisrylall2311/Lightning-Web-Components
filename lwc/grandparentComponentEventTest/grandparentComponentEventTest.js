import { LightningElement, api } from 'lwc';

export default class GrandparentComponentEventTest extends LightningElement {
    @api childDetailsName;
    @api childDetailsGender;
    @api childDetailsAddress;

    handleEventFromGranChildren(evt){
        console.log("handleEventFromGranChildren 1");
        this.childDetailsName = evt.detail.name;
        this.childDetailsGender = evt.detail.gender;
        this.childDetailsAddress = evt.detail.address;
        this.sendOkToParent();
        console.log("handleEventFromGranChildren 2");
    }

    sendOkToParent(){
        console.log("sendOkToParent 1");
        this.template.querySelector('c-parent-component-event-test').notifyParentFromGrandParent();
        console.log("sendOkToParent 2");
    }

    sendMessageToChild(){
        console.log("sendMessageToChild 1");
        var aMessage = "This is a message from grand parent";
        this.template.querySelector('c-parent-component-event-test').displayGrandParentMessageToChild(aMessage);
        console.log("sendMessageToChild 2");
    }
}