import { LightningElement, wire, track, api } from 'lwc';
import myJSONStructure from '@salesforce/apex/AP_FIRSTCLASS.myJSONStructure';
import getJSONStructureList from '@salesforce/apex/AP_FIRSTCLASS.getJSONStructureList'; 
export default class ApplicationEventTest1 extends LightningElement {
    @track aJsonStructure;
    @track aJsonStructureList = [];
    @track error;
    @api numberOfRecordDisplay = this.aJsonStructureList.length;
    @api name;
    @api address;
    @api gender;
    @api numberOfRecords;
    @api isLoaded = false;
    @api disactivateAddToTable = false;
    @api disableGenerateTableButton = false;

    connectedCallback(){ 
        this.isLoaded = true;
        this.disactivateAddToTable = true;
        this.disableGenerateTableButton = true;
    }
    
    callMyApexClass(){
        this.isLoaded = false;
        myJSONStructure()
            .then(result => {
                console.log("success call");
                this.aJsonStructure = JSON.parse(result);
                this.populateVariables(this.aJsonStructure)
                this.isLoaded = true;
                this.disactivateAddToTable = false;
            })
            .catch(error => {
                console.log("error call");
                this.error = error;
                console.log("error >> " + this.error);
            });
    }

    populateVariables(aJsonStructFromApex){
        this.name = aJsonStructFromApex.myName;
        this.address = aJsonStructFromApex.myAddress;
        this.gender = aJsonStructFromApex.myGender;
    }

    setNumberRecords(event){
        var numToDis = event.target.value;
        if(numToDis != null 
            && numToDis != 0){
            this.numberOfRecords = event.target.value;
            this.disableGenerateTableButton = false;
        }
        else{
            this.disableGenerateTableButton = true;
        }

    }

    generateTable(){
        console.log("generateTable 1");
        console.log("generateTable numberOfRecords >>>>  " + this.numberOfRecords);
        if(this.numberOfRecords != null 
            && this.numberOfRecords != 0){
            console.log("BM inside IF");
            this.isLoaded = false;
            getJSONStructureList({
                numberOfPersonToCreate: this.numberOfRecords
            })
                .then(result => {
                    console.log("success call");
                    //this.aJsonStructureList = JSON.parse(result);
                    this.populateList(JSON.parse(result));
                    this.isLoaded = true;
                })
                .catch(error => {
                    console.log("error call");
                    this.error = error;
                    console.log("error >> " + this.error);
                });
        }
        console.log("generateTable 2");
    }
    
    addToTable(){
        console.log("addToTable 1");
        if(this.aJsonStructure != null){
            this.aJsonStructureList.push(this.aJsonStructure);
            this.numberOfRecordDisplay = this.aJsonStructureList.length;
            this.disactivateAddToTable = true;
        }
        console.log("addToTable 2");
    }

    populateList(aList){
        console.log("populateList 1");
        if(aList.length != 0){
            var aJson;
            for(aJson of aList){
                this.aJsonStructureList.push(aJson);
            }
            this.numberOfRecordDisplay = this.aJsonStructureList.length;
        }
        console.log("populateList 2");
    }

    deleteFromList(evt){
        console.log("deleteFromList 1");
        var toDeleteId = evt.detail.dataId;
        var dataList = this.aJsonStructureList;
        for(var i=0;i<dataList.length;i++){
            if(dataList[i].myId == toDeleteId){
                dataList.splice(i, 1);
                break;
            }
        }
        this.aJsonStructureList = dataList;
        this.numberOfRecordDisplay = this.aJsonStructureList.length;
        console.log("deleteFromList 2");
    }
}