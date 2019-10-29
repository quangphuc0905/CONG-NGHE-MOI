var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');
var query = require('../dynamodb/query');
AWS.config.update({
  accessKeyId:"ASIA4KYENFHKAAYD7TZ7",
  secretAccessKey:"52SKBQ3lWpoHnWKSFnMO4pyZaZfKTJfu6zO1zopP",
  sessionToken: "FQoGZXIvYXdzEKT//////////wEaDNyCiOGDKkdIGuiKnCKKArI+8u6l+1mDb/WzZjbjMTwjIE1PAmt8TD1RwML/6N+XCZcj7Cl82MGy9f3nE7VX+hxwDtUI3TnKx7afEUNKFu/3GtruzMWwAJ9zEsGuxkMppZzPfQAV0Kr5G5MWGBAKwyL5V4/KadeDd7BSJlQArC4Owl7I4XS+dxRTJM9YHIclqSWMAHxbs7FNSaGCqwcxdb5jty4LMxs2ICeWwEAVp3ayKgnVR/28BqDChlqpjx1Khh2hDfjNaEO+3LyT0bBHi0gNIpw07S7if5S/H/pzrNvtGqxfXBVu3x06sXoL+8xZNLfP6Bf6RSnSNArFlSkw8/WRoYIXndxJUXUI+3PurOK7BLMyXtpifGGSKKrW3u0F",
  region: "us-east-1"
});

let docClient = new AWS.DynamoDB.DocumentClient();
router.get('/', function(req, res, next){

  var params = {
    TableName: "SAN_PHAM_TABLE"
  };
  var params1 = {
    TableName: "DON_HANG_TABLE"
  }
  var params2 = {
    TableName: "NHA_CUNG_CAP_TABLE",
    KeyConditionExpression: '#user = :value',
    ExpressionAttributeNames: {
      '#user': 'username'
    },
    ExpressionAttributeValues: {
      ':value': req.session.user,
    },
    ReturnConsumedCapacity: 'NONE',
  }
  var params3 = {
    TableName: "LOAI_SP_TABLE"
  }
  docClient.scan(params, function (err, data) {
    if (err) {
      console.log(JSON.stringify(err));
    }
    else {
        console.log("Yes");
        let sess = req.session;
      console.log(req.session);
      if(sess.user) {
          docClient.scan(params1, function (err, data1) {
                    if (err) {
                      console.log(JSON.stringify(err));
                    }
                    else {
                        console.log("Yes");
                        docClient.query(params2, function (err, data2) {
                          if (err) {
                            console.log(JSON.stringify(err));
                          }
                          else {
                              console.log("Yes");
                              docClient.scan(params3, function (err, data3) {
                                if (err) {
                                  console.log(JSON.stringify(err));
                                }
                                else {
                                    console.log("Yes");
                                    res.render('index_supplier.ejs', { obj: data.Items,supp:data2.Items,uname: sess.user, order: data1.Items, cate: data3.Items });
                                }
                              })
                          }
                        })
                    }
                  })
      }
      else
      {
        res.redirect('/');
      }
    }
  })
  });


  module.exports = router;