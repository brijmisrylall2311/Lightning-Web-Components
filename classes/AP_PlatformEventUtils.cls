public without sharing class AP_PlatformEventUtils {
    @AuraEnabled
    public static void createPlatformEventInstance(){
        List<Platform_Event_Example__e> platformEventList = new List<Platform_Event_Example__e>();
        Platform_Event_Example__e myPlatformEvent = new Platform_Event_Example__e();
        platformEventList.add(myPlatformEvent);
        //call method to publish events.
        insertPlatformEvents(platformEventList); 
    }

    public static void insertPlatformEvents(List<Platform_Event_Example__e> platformEventList){
        if(!platformEventList.isEmpty()){
            List<Database.SaveResult> results = EventBus.publish(platformEventList);
            //inspect publishing result for each event
            for (Database.SaveResult sr : results) {
                if (sr.isSuccess()) {
                    System.debug('Successfully published event.');
                } else {
                    for(Database.Error err : sr.getErrors()) {
                        System.debug('Error returned: ' + err.getStatusCode() + ' - ' + err.getMessage());
                    }
                }       
            }
        }
    }
}
