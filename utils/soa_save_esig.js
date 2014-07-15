var soap = require('soap');
//input	data foramt ={applicantId: '1261',
            // userRoleType: 'Applicant',
            // userRoleId: '1261',
            // formId: '2807-2',
            // signatureType : 'Esignature',
            // signaturePrint : 'png',
            // signatureImage  : 'iVBORw0KGgoAAAANSUhEUg...'
    // }

var soapSaveImage = function(){

	//wsdl location
	var url = 'http://198.135.15.92:8001/soa-infra/services/default/SignatureService/SignatureService_ep?WSDL';
    var retrieveArgs = {requestHeader:{ loginUserName: 'null', requestId:'1'}, applicantId:'1261'};
	var func = {
		save : function(data , callback){

				 if (data.applicantId == null){
				 	data.applicantId='1261' //default test applicant
				 }
				 if (data.userRoleType == null){
				 	data.userRoleType='Applicant' //default
				 }
				 if (data.userRoleId == null){
				 	data.userRoleId=data.applicantId //default
				 }
				 if (data.formId == null){
				 	data.formId='2807-2' //default
				 }
				 if (data.signatureType == null){
				 	data.signatureType='Esignature' //default
				 }
				 if (data.signaturePrint == null){
				 	data.signaturePrint='png' //default
				 }
				 if (data.signatureImage == null){
				 	return "Input needs a signatureImage!";
				 }
				 var baseString = data.signatureImage;//data
			     var index = baseString.indexOf(",");  // Gets the first index
			             //var imageEncodeType = baseString.substr(0, index); // first part
			     var textCode = baseString.substr(index + 1);//second part
				 var saveArgs = {requestHeader:{ loginUserName: 'null', requestId:'1'}, 
                                        applicantId: data.applicantId,
                                        userRoleType: data.userRoleType,
                                        userRoleId: data.userRoleId,
                                        formId: data.formId,
                                        signatureType : data.signatureType,
                                        signaturePrint : data.signaturePrint,
                                        signatureImage  : textCode
                                    };

                soap.createClient(url, function(err, client) {
			  	  if(err){
			  	  	  console.log ("Error msg: " + err);
			  	  	   callback(result.responseHeader);
			  	  }
  	              else{
	  	  				console.log(" ======= Oracle SOA saveSignature Response: ======");
	  	  			 //	console.log(client.describe().SignatureService_ep.SignatureServicePort_pt.saveSignature);
	  	 			 //console.log(client.describe().SignatureService_ep.SignatureServicePort_pt.retrieveSignature);
				        client.saveSignature(saveArgs, function(err, result) {
				           console.log (result);
				           console.log(result.responseHeader.instanceId);
				           callback(result.responseHeader);
				        });

				      }                     	
				});
        },        
		retrieve: function(data ,callback){
			//TODO:
			if (data.applicantId == null){
				 	data.applicantId='1261' //default test applicant
				 }
			if (data.formId == null){
				 	data.formId='2807-2' //default
				 }
			var saveArgs = {requestHeader:{ loginUserName: 'null', requestId:'1'}, 
                                        applicantId: data.applicantId,
                                        formId: data.formId
                                    };
            soap.createClient(url, function(err, client) {
			  	  if(err){
			  	  	  console.log ("Error msg: " + err);
			  	  	   callback(result.responseHeader);
			  	  }
  	              else{
	  	  				console.log(" ======= Oracle SOA retrieveSignature Response: ======");
				        client.retrieveSignature(saveArgs, function(err, result) {
				           //console.log (result.Signature);
				           console.log(result.responseHeader.instanceId);
				           //userRoleType is the factor for the search
				           for (var i=0; result.Signature !==undefined && (i < result.Signature.length) ; ++i){
				           		console.log(result.Signature[i].userRoleType);
				           		if(result.Signature[i].userRoleType == 'Applicant'){
				           			return callback(result.Signature[i]);
				           		}
				           }
				           callback(result.responseHeader);
				        });

				      }                     	
				});

		}
	}
	//console.log(" soapSave instanciated"); 
 	return func;
}();

module.exports =  soapSaveImage;