var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');
var query = require('../dynamodb/query');
AWS.config.update({
  region: 'local',
  endpoint: 'http://localhost:8000'
});

let docClient = new AWS.DynamoDB.DocumentClient();
router.get('/', function(req, res, _){
    var params = {
        TableName: "DON_HANG_TABLE"
      };
    var params1 = {
        TableName: "LOAI_SP_TABLE"
    }
    var params2 = {
      TableName: "NHA_CUNG_CAP_TABLE"
    }
    var params3 = {
      TableName: "KHACH_HANG_TABLE"
    }
      docClient.scan(params, function (err, data) {
        if (err) {
          console.log(JSON.stringify(err));
        }
        else {
          let sess = req.session;
          console.log(req.session);
          if(sess.user) {
            console.log("Yes");
            docClient.scan(params1, function(err, data1){
              if(err){
                console.log(JSON.stringify(err));
              }
              else{
                docClient.scan(params2, function(err, data2){
                  if(err){
                    console.log(JSON.stringify(err));
                  }
                  else{
                    docClient.scan(params3, function(err, data3){
                      if(err){
                        console.log(JSON.stringify(err));
                      }
                      else{
                          res.render('checkout.ejs', { order: data.Items, uname: sess.user, cate: data1.Items, supp:data2.Items, khs: data3.Items });
                      }
                    })              }
                })
              }
            })
          }
          else {
            console.log("No");
            docClient.scan(params1, function(err, data1){
              if(err){
                console.log(JSON.stringify(err));
              }
              else{
                docClient.scan(params2, function(err, data2){
                  if(err){
                    console.log(JSON.stringify(err));
                  }
                  else{
                    docClient.scan(params3, function(err, data3){
                      if(err){
                        console.log(JSON.stringify(err));
                      }
                      else{
                          res.render('checkout.ejs', { order: data.Items, uname: null, cate: data1.Items, supp:data2.Items, khs: data3.Items });
                      }
                    })        
                      }
                })
              }
            })
          }
          }
        })
  });


  module.exports = router;