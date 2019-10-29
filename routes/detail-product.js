var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');
var query = require('../dynamodb/query');
AWS.config.loadFromPath('./awsConfig.json');

let docClient = new AWS.DynamoDB.DocumentClient();
router.get('/', function(req, res, _){

  var params = {
    TableName: "SAN_PHAM_TABLE"
  };
  var params1 = {
    TableName:"LOAI_SP_TABLE"
  }
  docClient.scan(params, function (err, data) {
    if (err) {
      console.log(JSON.stringify(err));
    }
    else {
        console.log("Yes");
        let sess = req.session;
        if(sess.user)
        {
          docClient.scan(params1, function(err, data1){
            if(err){
              console.log(JSON.stringify(err));
            }
            else{
              res.render('detail-product.ejs', { obj: data.Items, uname: sess.user, cate:data1.Items });
            }
          })
        }
        else{
          docClient.scan(params1, function(err, data1){
            if(err){
              console.log(JSON.stringify(err));
            }
            else{
              res.render('detail-product.ejs', { obj: data.Items, uname: null, cate:data1.Items });
            }
          })
        }
        
    }
  })
  });


  module.exports = router;