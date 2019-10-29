var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');
var query = require('../dynamodb/query');
AWS.config.loadFromPath('./awsConfig.json');
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