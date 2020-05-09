import { LightningElement } from 'lwc';

export default class TotalAverageCalculator extends LightningElement {
    myTotal = 0;
    myValue1 = 0;
    myValue2 = 0;
    myAverage = 0;

    valueChangeHandler(event){
        console.log("-------------------------------->>  valueChanger function START");
        var textBoxObject = event.target;
        var textBoxValue = textBoxObject.value != "" ? Number(textBoxObject.value) : 0;
        if(textBoxObject.label == "Value 1"){
          this.myValue1 = textBoxValue;
          this.myTotal = textBoxValue + this.myValue2;
        }
        else{
          this.myValue2 = textBoxValue;
          this.myTotal = textBoxValue + this.myValue1;
        }
        this.calculateAverage(this.myTotal, 2);
        console.log("valueChanger function FINISH");
      }
    
      calculateAverage(aTotal,aCount){
        console.log(">>>>>  calculateAverage function START");
        if(aCount != 0){
          this.myAverage = aTotal / aCount; 
        }
        console.log("calculateAverage function FINISH");
      }
}