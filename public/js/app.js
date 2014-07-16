var wrapper = document.getElementById("signature-pad"),
    clearButton = wrapper.querySelector("[data-action=clear]"),
    saveButton = wrapper.querySelector("[data-action=save]");
    closeButton = wrapper.querySelector("[data-action=close]");

//helper to get params 
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
//https://localhost:3004/?req_type=r&applicantId=1271&formId=2807-2&userRoleType=Recruiter
if(saveButton != null){
saveButton.addEventListener("click", function (event) {
   
        //console.log('RawString: '+ window.location.search);
        var formId_in = getParameterByName('formId');
        var applicantId_in = getParameterByName('applicantId');
        var userRoleType_in = getParameterByName('userRoleType');
        if( formId_in =="") {
            alert("Fail: formid not provided!");
            return;
        }
        if( applicantId_in=="") {
            alert("Fail: applicantid not provided!");
            return;
        }
        if( userRoleType_in=="") {
            alert("Fail: applicantid not provided!");
            return;
        }
        // console.log(getParameterByName('formid') );
        // console.log(getParameterByName('applicantid') );
        $.post(
        "/post", // Gets the URL to sent the post to
        {applicantId : applicantId_in,
         formId :    formId_in,
         userRoleType: userRoleType_in}, // Serializes form data in standard format
        function(data ) {
            var dataOutputStr = "something went wrong"
            if (data.operationStatus != null) {
            // alert("<server respone>\n" + "Operation status : " + data.operationStatus +"\n"+
            //         "Instance ID : " + data.instanceId );
            // }

            if(data.operationStatus == 'true'){
                    dataOutputStr = "CAC signature saved ok!";
            }
            else{
                dataOutputStr = "CAC signature save failed";
            }
            
            $(document.body).empty();
            $(document.body).prepend('<p> Operation status =' +dataOutputStr+'<p/>');
            $(document.body).append('<button class="button save" data-action="close">close</button>');
            }
         },
        "json" // The format the response should be in
    );
        
    
});
}
if(closeButton != null){
closeButton.addEventListener("click", function (event) {

    open(location, '_self').close();

});
}