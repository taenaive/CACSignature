var express = require('express');
var soapSave = require('../utils/soa_save_esig');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //for http://taeyoon.us:3003/?req_type=r&applicantId=1261&formId=2807-2
  //http://localhost:3003/?req_type=r&applicantId=1271&formId=2807-2
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
          res.render('index', { title: 'MPSTD E Signature Pad' });
        }
        else{
          var buf = new Buffer(b64string, 'base64');
            // console.log("base64 buffer length = " +buf.length);
          res.setHeader("Content-Type", "image/png");
          res.send( buf );
        }
        
      } );   
  }
  else{//default Esing sign pad
    res.render('index', { title: 'MPSTD E Signature Pad' });
  }
});

router.post('/post',function(req, res){
 
  var sig = req.body;
  console.log("applicant id = [%s]" ,sig.applicantId );
  console.log("form id = [%s]" ,sig.formId );
  
  var inputData = {
  		applicantId: sig.applicantId,
        // userRoleType: data.userRoleType,
        // userRoleId: data.userRoleId,
        formId: sig.formId,
        // signatureType : data.signatureType,
        // signaturePrint : data.signaturePrint,
        signatureImage  : sig.base64png
  };
 
  soapSave.save(inputData, function (result ){
  	res.send(result);
  });
  //Creature.prototype.insertSignature(this.req.body);
  //res.writeHead(200, { 'Content-Type': 'application/json' });
  
});


module.exports = router;
