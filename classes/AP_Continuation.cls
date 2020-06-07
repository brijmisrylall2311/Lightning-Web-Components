public with sharing class AP_Continuation {

    public AP_Continuation() {

    }

    // Action method
    @AuraEnabled(continuation=true cacheable=true)
    public static Object startRequest() {

        Continuation con = new Continuation(120); //set time out to 2 minutes
        con.continuationMethod='handleMyResponse'; //Which method will handle the response
        con.state='My Continuation Call';

        //request 1
        HttpRequest req1 = new HttpRequest();
        req1.setMethod('GET');
        req1.setEndpoint('https://9e65ec12-538a-4258-bbc4-324684e8961e.mock.pstmn.io/testbm');
        con.addHttpRequest(req1); //add request 1 to continuation

        //request 2
        HttpRequest req2 = new HttpRequest();
        req2.setMethod('GET');
        req2.setEndpoint('https://9e65ec12-538a-4258-bbc4-324684e8961e.mock.pstmn.io/testbm');
        con.addHttpRequest(req2); //add request 2 to continuation

        //request 3
        HttpRequest req3 = new HttpRequest();
        req3.setMethod('GET');
        req3.setEndpoint('https://9e65ec12-538a-4258-bbc4-324684e8961e.mock.pstmn.io/testbm');
        con.addHttpRequest(req3); //add request 3 to continuation

        return con;
    }

    @AuraEnabled(cacheable=true)
    public static Map<String, Object> handleMyResponse() {

        Map<String, Object> resultMap = new Map<String, Object>();

        //get response of first request
        HttpResponse response1 = Continuation.getResponse('Continuation-1'); //Continuation-1 refers to the first request
        String result1 = response1.getBody();
        resultMap.put('Continuation1', result1);

        //get response of second reaquest
        HttpResponse response2 = Continuation.getResponse('Continuation-2'); //Continuation-2 refers to the second request
        String result2 = response2.getBody();
        resultMap.put('Continuation2', result2);

        //get response of third request
        HttpResponse response3 = Continuation.getResponse('Continuation-3'); //Continuation-3 refers to the third request
        String result3 = response3.getBody();
        resultMap.put('Continuation3', result3);

        return resultMap;
    }
}