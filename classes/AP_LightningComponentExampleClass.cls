/*
 * author : Brij Misrylall
 * date : 16/05/2020
 * description : Controller for Lightning Component example
*/
public with sharing class AP_LightningComponentExampleClass {

    /*
    * author : Brij Misrylall
    * date : 16/05/2020
    * description : method to query list of cars
    */
    @AuraEnabled
    public static List<Car__c> getCarList(){
        List<Car__c> myCarList = new List<Car__c>();
        myCarList = [SELECT Id, Name, Model__c, Price__c, Colour__c
                     FROM Car__c
                     LIMIT 100];
        return myCarList;
    }
}
