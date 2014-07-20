var wrapper = document.getElementById("signature-pad"),
    clearButton = wrapper.querySelector("[data-action=clear]"),
    saveButton = wrapper.querySelector("[data-action=save]");
//    closeButton = wrapper.querySelector("[data-action=close]");

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
        var url = "https://"+location.hostname+":3004"+"/?req_type=r"+"&formId="+formId_in+"&applicantId="+applicantId_in+"&userRoleType="+userRoleType_in
        //window.open(url, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
        window.location.href =url;
    
});
}
// if(closeButton != null){
// closeButton.addEventListener("click", function (event) {

//     open(location, '_self').close();

// });
// }