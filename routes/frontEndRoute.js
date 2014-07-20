var express = require('express');
var soapSave = require('../utils/soa_save_esig');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
   var sig = req.query;
      console.log(sig);
  if (sig.req_type && sig.req_type == 'r'){
      var inputData = {
        applicantId: sig.applicantId,
        formId: sig.formId        
      };
      soapSave.retrieve(inputData,function (result ){
        var b64string = result.signatureImage;
        if(b64string == null){
          res.render('front_end', { title: 'MPSTD CAC Signature', cacContent: "no sig found" });
        }
        else{
          var buf = new Buffer(b64string, 'base64');
          res.render('response', { title: 'MPSTD CAC Signature response', cacContent: buf.toString('ascii') });
        // console.log("base64 buffer length = " +buf.length);
        }
      } );   
  }
  else{//default Esing sign pad
    res.render('front_end', { title: 'MPSTD CAC Signature', cacContent: "no sig found" });
  }
});

module.exports = router;