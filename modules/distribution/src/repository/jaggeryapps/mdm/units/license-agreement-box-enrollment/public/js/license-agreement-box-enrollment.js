$( document ).ready(function() {
    var iOSCheckUrl = "/mdm/controller/check";
    setInterval(
        function x() {
            $.get(iOSCheckUrl).done(function(data, textStatus){
                if(textStatus=="success"){
                    var parsedData = JSON.parse(data);
                    var deviceId = parsedData.deviceId;

                    if(deviceId != null) {
                        window.location = "/mdm/thank-you-agent?deviceId="+deviceId;
                    }
                }
            }).fail(function(jqXHR, textStatus){
                if(jqXHR.status==403){
                    window.location = "/mdm/login-agent#error"
                }
            });
        }, 2000);
});