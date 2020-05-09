/*
 * author : Brij Misrylall
 * description : First class for LWC test
 * date : 01/05/2020
*/
public with sharing class AP_FIRSTCLASS {
    public AP_FIRSTCLASS() {

    }
    /*
    * author : Brij Misrylall
    * date : 01/05/2020
    * description : method to create a json with the structure AP_WrapperStructure
    */
    @AuraEnabled
    public static String myJSONStructure(){
        String jsonStructure = '';
        AP_WrapperStructure wrapperStructure = new AP_WrapperStructure();
        wrapperStructure = buildJsonStructure();
        if(wrapperStructure != null){
            jsonStructure = json.serialize(wrapperStructure);
        }
        System.debug('my json structure : ' + jsonStructure);
        return jsonStructure;
    }
    /*
    * author : Brij Misrylall
    * date : 01/05/2020
    * description : method to create a json list with structure the class AP_WrapperStructure
    */
    @AuraEnabled
    public static String getJSONStructureList(Integer numberOfPersonToCreate){
        Integer counter = 0;
        String jsonStructureList = '';
        AP_WrapperStructure jsonStructure;
        List<AP_WrapperStructure> wrapperStructureList = new List<AP_WrapperStructure>();
        while(counter < numberOfPersonToCreate){
            jsonStructure = buildJsonStructure();
            wrapperStructureList.add(jsonStructure);
            counter++;
        }
        if(wrapperStructureList != null 
            && !wrapperStructureList.isEmpty()){
            jsonStructureList = json.serialize(wrapperStructureList);
        }
        System.debug('my json structure list : ' + jsonStructureList);
        return jsonStructureList;
    }
    /*
    * author : Brij Misrylall
    * date : 01/05/2020
    * description : method to create a filled instance of the wrapper class AP_WrapperStructure
    */
    public static AP_WrapperStructure buildJsonStructure(){
        AP_WrapperStructure wrapperStructure = new AP_WrapperStructure();
        wrapperStructure.myName = buildRandomName();
        wrapperStructure.myAddress = buildRandomAddress();
        wrapperStructure.myGender = getRandomGender();
        wrapperStructure.myId = buildRandomString(5);
        return wrapperStructure;
    }
    /*
    * author : Brij Misrylall
    * date : 01/05/2020
    * description : method to generate a random String
    */
    public static String buildRandomString(Integer stringLength){
        final String chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
        String randStr = '';
        while (randStr.length() < stringLength) {
           Integer idx = Math.mod(Math.abs(Crypto.getRandomInteger()), chars.length());
           randStr += chars.substring(idx, idx+1);
        }
        return randStr;
    }
    /*
    * author : Brij Misrylall
    * date : 01/05/2020
    * description : method to generate a random number
    */
    public static Integer getRandomNumber(){
        Integer actualSecond = DateTime.now().second();
        Integer randomNumber = 3;
        randomNumber = Math.mod(Math.abs(Crypto.getRandomInteger()), actualSecond);
        return randomNumber;
    }
    /*
    * author : Brij Misrylall
    * date : 01/05/2020
    * description : method to generate a random name
    */
    public static String buildRandomName(){
        String randomName = '';
        String firstName = '';
        String lastName = '';
        Integer myRandomNumber = getRandomNumber();
        myRandomNumber = myRandomNumber == 0 ? 3 : myRandomNumber;
        firstName = buildRandomString(myRandomNumber);
        lastName = buildRandomString(myRandomNumber++);
        randomName = firstName + ' ' + lastName;
        return randomName;
    }
    /*
    * author : Brij Misrylall
    * date : 01/05/2020
    * description : method to generate a random address
    */
    public static String buildRandomAddress(){
        String randomAddress = '';
        Integer myRandomNumber = getRandomNumber();
        myRandomNumber = myRandomNumber == 0 ? 8 : myRandomNumber;
        randomAddress = String.valueOf(myRandomNumber) + ', ';
        randomAddress += buildRandomString(myRandomNumber) + ', ';
        randomAddress += buildRandomString(myRandomNumber);
        return randomAddress;
    }
    /*
    * author : Brij Misrylall
    * date : 01/05/2020
    * description : method to randomly choose between male and female gender
    */
    public static String getRandomGender(){
        final List<String> genderFinalList = new List<String>{'Male', 'Female'};
        String randomGender = genderFinalList[0];
        Integer myRandomNumber = getRandomNumber();
        randomGender = Math.mod(myRandomNumber, 2) == 0 ? genderFinalList[0] : genderFinalList[1];
        return randomGender;
    }
}