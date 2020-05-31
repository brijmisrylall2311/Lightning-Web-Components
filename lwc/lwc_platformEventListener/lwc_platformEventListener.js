import { LightningElement, api, track } from 'lwc';
import { subscribe, unsubscribe, onError, setDebugFlag, isEmpEnabled } from 'lightning/empApi';

export default class Lwc_platformEventListener extends LightningElement {
    @api platformEventChannel = "/event/Platform_Event_Example__e";
    @api payload;
    @track payloadList = [];

    connectedCallback(){
        this.handleSubscribe();
    }

    handleSubscribe() {
        // Callback invoked whenever a new event message is received
        const messageCallback = (response) => {
            console.log('New message received : ', JSON.stringify(response));
            this.payload = response;
            this.payLoadManipulation();
            // Response contains the payload of the new message received
        };

        // Invoke subscribe method of empApi. Pass reference to messageCallback
        subscribe(this.platformEventChannel, -1, messageCallback).then(response => {
            // Response contains the subscription information on successful subscribe call
            console.log('Successfully subscribed to : ', JSON.stringify(response.channel));
            this.subscription = response;
        });
    }

    payLoadManipulation(){
        console.log("payLoadManipulation 1");
        if(this.payload){
            var aPayload = {
                "id" : this.payload.data.payload.CreatedDate,
                "info" : "new event"
            }
            this.payloadList.push(aPayload);
        }
    }
}