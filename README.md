CACSignature
============

Smart card client sign in node.js server app

required params:
----------------

* ***formId = <1-5*** :SOA service agreed string> example: ?formId=2
* ***req_type=r*** :constant
* ***applicantId=<SOA agreed string> example*** : applicantId=1234
* ***userRoleType= <SOA agreed string> example*** :userRoleType=Recruiter

Use the port CACsing:port 3005
There is a another port 3004 but this is for basic use. use 3004 for the full multiuser services.

It requires the same JSON query string to do Electronic and CAC card signatures.


***CAC sig*** : For recruiter,MP,ME signatures

example ADF code for inlineFraming :
-------------------------------------
```adf
<af:inlineFrame source="http://mpstduidev:3005/?req_type=r&applicantId=#
{bindings.applicantId.inputValue}&formId=2&userRoleType=#{bindings.userRoleType}""
inlineStyle="width:300px;//this is the size you want to display the CAC signature.
```

