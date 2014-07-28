var express = require('express');
var soapSave = require('../utils/soa_save_esig')('http://192.168.0.6:8001/soa-infra/services/default/SignatureService/SignatureService_ep?WSDL');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //for http://taeyoon.us:3003/?req_type=r&applicantId=1261&formId=2807-2
  //http://localhost:3003/?req_type=r&applicantId=1271&formId=2807-2
  
  var cert = req.connection.getPeerCertificate();
        //res.send(JSON.stringify({"status": "denied", "cert" : cert}) );
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
          res.render('index', { title: 'MPSTD CAC Signature', cacContent: JSON.stringify(cert.subject) });
        }
        else{
          var buf = new Buffer(b64string, 'base64');
          var  cacObj =JSON.parse( buf.toString('ascii') );
          res.render('response',
           { title: 'MPSTD CAC Signature response', cacContent: JSON.stringify(cacObj.subject),
             cacSignature: JSON.stringify(cacObj.fingerprint),
             timeStamp: JSON.stringify(result.signatureDateTime)
           });
        }
      } );   
  }
  else{//default Esing sign pad
    res.render('index', { title: 'MPSTD CAC Signature', cacContent:cert.cert.subject.CN });
  }
});

router.post('/post',function(req, res){
  var cert = req.connection.getPeerCertificate();
  var sig = req.body;
  console.log("applicant id = [%s]" ,sig.applicantId );
  console.log("form id = [%s]" ,sig.formId );
  if (!cert.subject){
    res.send({ inputError: 'failed'});
    //console.log("I am here")
    return;
  }
  else{
  var inputData = {
  		applicantId: sig.applicantId,
      userRoleType: sig.userRoleType,
        // userRoleId: data.userRoleId,
        formId: sig.formId,
        // signatureType : data.signatureType,
        // signaturePrint : data.signaturePrint,
        signatureImage  : new Buffer(JSON.stringify(cert)).toString('base64')
  };
 
  soapSave.save(inputData, function (result ){ console.log(result);

  	res.send(JSON.stringify(result));
  });
  //Creature.prototype.insertSignature(this.req.body);
  //res.writeHead(200, { 'Content-Type': 'application/json' });
  }
});


module.exports = router;


