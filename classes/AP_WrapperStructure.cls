/*
 * author : Brij Misrylall
 * description : defining a wrapper class for my LWC
 * date : 01/05/2020
*/
public with sharing class AP_WrapperStructure {
    public AP_WrapperStructure() {

    }
    @AuraEnabled public String myName;
    @AuraEnabled public String myAddress;
    @AuraEnabled public String myGender;
    @AuraEnabled public String myId;
}