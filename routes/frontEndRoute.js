var express = require('express');
var soapSave = require('../utils/soa_save_esig')('http://192.168.0.6:8001/soa-infra/services/default/SignatureService/SignatureService_ep?WSDL');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
   var sig = req.query;
      console.log(sig);
  if(!sig.userRoleType){
    res.render('front_end', { title: 'MPSTD CAC Signature', cacContent: "need to supply userRoleType" });
    return;
  }
  if (sig.req_type && sig.req_type == 'r'){
      var inputData = {
        applicantId: sig.applicantId,
        formId: sig.formId,
        userRoleType: sig.userRoleType        
      };
      soapSave.retrieve(inputData,function (result ){
        var b64string = result.signatureImage;
        if(b64string == null){
          res.render('front_end', { title: 'MPSTD CAC Signature', cacContent: "no sig found" });
        }
        else{
          var buf = new Buffer(b64string, 'base64');
          var  cacObj =JSON.parse( buf.toString('ascii') );
          res.render('response',
           { title: 'MPSTD CAC Signature response', cacContent: JSON.stringify(cacObj.subject),
             cacSignature: JSON.stringify(cacObj.fingerprint),
             timeStamp: JSON.stringify(result.signatureDateTime)
           });
        // console.log("base64 buffer length = " +buf.length);
        }
      } );   
  }
  else{//default Esing sign pad
    res.render('front_end', { title: 'MPSTD CAC Signature', cacContent: "no sig found" });
  }
});

module.exports = router;