var wrapper = document.getElementById("signature-pad"),
    clearButton = wrapper.querySelector("[data-action=clear]"),
    saveButton = wrapper.querySelector("[data-action=save]");

//helper to get params 
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
//https://localhost:3004/?req_type=r&applicantId=1271&formId=2807-2&userRoleType=Recruiter
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
            if (data.operationStatus != null) {
            // alert("<server respone>\n" + "Operation status : " + data.operationStatus +"\n"+
            //         "Instance ID : " + data.instanceId );
            // }
            $(document.body).empty();
            $(document.body).prepend('<p>' + data.signatureImage+'<p/>');
            }
         },
        "json" // The format the response should be in
    );
        
    
});
