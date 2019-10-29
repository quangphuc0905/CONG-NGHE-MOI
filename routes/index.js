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
                      res.render('index.ejs', { scanObject: data.Items, uname: sess.user, cate: data1.Items, supp:data2.Items, khs: data3.Items });
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
                      res.render('index.ejs', { scanObject: data.Items, uname: null, cate: data1.Items, supp:data2.Items, khs: data3.Items });
                  }
                })              }
            })
          }
        })
      }
    }
    })
    
});
router.post('/signin', function (req, res, next) {
  var params2 = {
      TableName: 'KHACH_HANG_TABLE',
      KeyConditionExpression: '#user = :val',
      ExpressionAttributeNames: {
        '#user': 'username'
      },
      ExpressionAttributeValues: {
        ':val': req.body.username,
      },
      ReturnConsumedCapacity: 'NONE',
  };
  var params3 = {
    TableName: 'NHA_CUNG_CAP_TABLE',
    KeyConditionExpression: '#user = :value',
    ExpressionAttributeNames: {
      '#user': 'username'
    },
    ExpressionAttributeValues: {
      ':value': req.body.username,
    },
    ReturnConsumedCapacity: 'NONE',
};
  docClient.query(params2, function (err, data) {
    if (err) {
      console.log(JSON.stringify(err));
      res.redirect('/');
    }
    else {
      console.log(JSON.stringify(data));
      console.log(data.Items.length+"aaaaaaaaaaaaaa");
      if(req.body.loai == "0")
      {
        if(data.Items.length != 0) {
          for(let i =0; i<data.Items.length;i++)
          {
            console.log(data.Items[i].username);
            console.log(data.Items[i].password);
          }
          let us = data.Items[0];
          console.log(us + "us")
          if(req.body.pass == us.password) {
            if(req.body.username == us.username){
              req.session.user = us.username;
              console.log("Success");
              res.redirect('/');
            }
            else{
              console.log("Fail");
              res.redirect('/');
              res.end();
            }
          }
          else {
            console.log("Fail");
            res.redirect('/');
            res.end();
          }
        }
        else{
          res.redirect('/');
        }
      }
      else{
        docClient.query(params3, function(err, data1){
          if(err)
          {
            console.log(JSON.stringify(err));
            res.redirect('/');
          }
          else{
            console.log(JSON.stringify(data1));
            console.log(data1.Items.length+"bbbbbbbbb");
            if(data1.Items.length != 0) {
              let us = data1.Items[0];
              if(req.body.pass == us.password) {
                if(req.body.username == us.username){
                  req.session.user = us.username;
                  console.log("Success");
                  res.redirect('/supplier');
                }
                else{
                  console.log("Fail");
                  res.redirect('/');
                  res.end();
                }
              }
              else {
                console.log("Fail");
                res.redirect('/');
                res.end();
              }
            }
            else
            {
              res.redirect('/');
            }
          }
        })
      }

      
    }
  });
});
router.get('/logout', function (req, res, next) {
  req.session.destroy((err) => {
    if(err)
      console.log(err);
  });
  res.redirect('/');
});


module.exports = router;