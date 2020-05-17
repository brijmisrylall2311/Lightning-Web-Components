import { LightningElement, wire, api } from 'lwc';
import getCarList from '@salesforce/apex/AP_LightningComponentExampleClass.getCarList';

export default class LWC_ApexCalloutExample extends LightningElement {
    @api isLoaded = false;
    @api aCarList = [];

    connectedCallback(){
        this.isLoaded= true;
    }

    makeAnApexCall(){
        this.isLoaded = false;
        getCarList()
            .then(result => {
                console.log("success call");
                this.aCarList = result;
                this.isLoaded = true;
            })
            .catch(error => {
                console.log("error call");
                this.error = error;
                console.log("error >> " + this.error);
            });
    }

}