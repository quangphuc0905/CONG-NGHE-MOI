var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId:"ASIA4KYENFHKAAYD7TZ7",
  secretAccessKey:"52SKBQ3lWpoHnWKSFnMO4pyZaZfKTJfu6zO1zopP",
  sessionToken: "FQoGZXIvYXdzEKT//////////wEaDNyCiOGDKkdIGuiKnCKKArI+8u6l+1mDb/WzZjbjMTwjIE1PAmt8TD1RwML/6N+XCZcj7Cl82MGy9f3nE7VX+hxwDtUI3TnKx7afEUNKFu/3GtruzMWwAJ9zEsGuxkMppZzPfQAV0Kr5G5MWGBAKwyL5V4/KadeDd7BSJlQArC4Owl7I4XS+dxRTJM9YHIclqSWMAHxbs7FNSaGCqwcxdb5jty4LMxs2ICeWwEAVp3ayKgnVR/28BqDChlqpjx1Khh2hDfjNaEO+3LyT0bBHi0gNIpw07S7if5S/H/pzrNvtGqxfXBVu3x06sXoL+8xZNLfP6Bf6RSnSNArFlSkw8/WRoYIXndxJUXUI+3PurOK7BLMyXtpifGGSKKrW3u0F",
  region: "us-east-1"
});
let docClient = new AWS.DynamoDB.DocumentClient();
router.get('/', function(req, res, next){

    
  });

  module.exports = router;