import { LightningElement, api } from 'lwc';
import createPlatformEventInstance from '@salesforce/apex/AP_PlatformEventUtils.createPlatformEventInstance';

export default class Lwc_platformEventTrigger extends LightningElement {
    @api isLoaded = false;
    
    connectedCallback(){
        this.isLoaded = true;
    }

    createPlatformEvent(){
        this.isLoaded = false;
        createPlatformEventInstance()
            .then(result => {
                console.log("success call");
                this.isLoaded = true;
            })
            .catch(error => {
                console.log("error call");
                this.error = error;
                console.log("error >> " + this.error);
            });
    }
}