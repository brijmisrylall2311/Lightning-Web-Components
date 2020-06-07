import { LightningElement, api } from 'lwc';
import startRequest from '@salesforce/apexContinuation/AP_Continuation.startRequest';

export default class ContinuationTest extends LightningElement {

    @api myResponse;
    @api showResponse1 = false;
    @api showResponse2 = false;
    @api showResponse3 = false;
    @api isLoaded = false;
    @api disableButton = false;

    connectedCallback(){
        this.isLoaded= true;
    }
    
    makeCallout(){
        console.log("make callout 1");
        this.isLoaded = false;
        startRequest()
            .then(result => {
                console.log("webservice response");
                console.log(result);
                this.myResponse = result;
                if(result.Continuation1){
                    this.showResponse1 = true;
                }
                if(result.Continuation2){
                    this.showResponse2 = true;
                }
                if(result.Continuation3){
                    this.showResponse3 = true;
                }
                this.isLoaded = true;
                this.disableButton = true;
            })
            .catch(error => {
                console.log("error call");
                console.log("error >> " + this.error);
            });
            console.log("make callout 2");
    }

}