var wrapper = document.getElementById("signature-pad"),
    clearButton = wrapper.querySelector("[data-action=clear]"),
    saveButton = wrapper.querySelector("[data-action=save]"),
    canvas = wrapper.querySelector("canvas"),
    signaturePad;

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    var ratio =  window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

window.onresize = resizeCanvas;
resizeCanvas();

signaturePad = new SignaturePad(canvas);

clearButton.addEventListener("click", function (event) {
    signaturePad.clear();
});

//helper to get params 
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

saveButton.addEventListener("click", function (event) {
    if (signaturePad.isEmpty()) {
        alert("Please provide signature first.");
    } else {
        //console.log('RawString: '+ window.location.search);
        var formId_in = getParameterByName('formId');
        var applicantId_in = getParameterByName('applicantId')
        if( formId_in =="") {
            alert("Fail: formid not provided!");
            return;
        }
        if( applicantId_in=="") {
            alert("Fail: applicantid not provided!");
            return;
        }
        // console.log(getParameterByName('formid') );
        // console.log(getParameterByName('applicantid') );
        $.post(
        "/post", // Gets the URL to sent the post to
        {applicantId : applicantId_in,
         formId :    formId_in,
         base64png: signaturePad.toDataURL()}, // Serializes form data in standard format
        function(data ) {
            if (data.operationStatus != null) {
            // alert("<server respone>\n" + "Operation status : " + data.operationStatus +"\n"+
            //         "Instance ID : " + data.instanceId );
            // }
            $(document.body).empty();
            $(document.body).prepend('<img id="pngSignature" src="' + signaturePad.toDataURL()+'" />');
            }
         },
        "json" // The format the response should be in
    );
        
    }
});
