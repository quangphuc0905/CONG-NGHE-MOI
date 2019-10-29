var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');
var query = require('../dynamodb/query');
AWS.config.update({
  region: 'local',
  endpoint: 'http://localhost:8000'
});
let docClient = new AWS.DynamoDB.DocumentClient();
router.get('/', function(req, res, next){
  res.render('signin-supp.ejs');
    
  });

router.post('/signinn', function(req, res, next){
  var params = {
    TableName: "KHACH_HANG_TABLE"
  };
  var params1 = {
      TableName: "NHA_CUNG_CAP_TABLE"
    };
  var params2 = {
      TableName: "LOAI_SP_TABLE"
  };
  docClient.scan(params, function (err, data) {
    if (err) {
      console.log(JSON.stringify(err));
    }
    else {
      docClient.scan(params1, function (err, data1) {
          if (err) {
            console.log(JSON.stringify(err));
          }
          else {
              docClient.scan(params2, function (err, data2) {
                  if (err) {
                    console.log(JSON.stringify(err));
                  }
                  else if(req.body.username == "admin" && req.body.pass =="admin") {
                     res.render('admin_index.ejs', { tkkh: data.Items, tkdn: data1.Items, cate: data2.Items });
                    
                  }
                  else{
                    res.redirect('/admin');
                  }
              })  
          }
          })        
    }
    })
})
  module.exports = router;