var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');
AWS.config.update({
  region: 'local',
  endpoint: 'http://localhost:8000'
});
let docClient = new AWS.DynamoDB.DocumentClient();
router.get('/', function(req, res, next){

    
  });

  module.exports = router;