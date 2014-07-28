var soapSave = require('../utils/soa_save_esig')('http://mpstd-soa01:8001/soa-infra/services/default/SignatureService/SignatureService_ep?WSDL');

exports.Test = {
    "Core SOAP testing": function (test) {
        test.expect(2);

        
        var data ={
				 	applicantId : '1261', //default test applicant
				 	formId :'2807-2' //default
				 } ;
	    var testBuffer = null;
		var callBackTest =function (result ){
							
					        var b64string = result.signatureImage;
					        if(b64string == null){
					          //test.ok(buf != null, "base64 Image retrieve failed");//test passed
					        }
					        else{
					          testBuffer = new Buffer(b64string, 'base64');
					          
					        }
					       
					      }
       
        soapSave.retrieve(data , callBackTest);
      
        setTimeout(function(){
        	
        	test.ok(testBuffer != null, "base64 Image retrieve test");//test passed
            test.equal(true, true, 'shoud pass');//future test
            test.done();
        }, 2000);

       
    }
}
