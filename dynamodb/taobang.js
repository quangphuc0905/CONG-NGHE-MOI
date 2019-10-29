var AWS = require('aws-sdk');

AWS.config.update({
    region: "local",
    endpoint: "http://localhost:8000"
});
let dynamodb = new AWS.DynamoDB();
var paramsOrder = {
    TableName: 'DONHANGs',
    KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
        { // Required HASH type attribute
            AttributeName: 'order',
            KeyType: 'HASH',
        },
        { // Optional RANGE key type for HASH + RANGE tables
            AttributeName: 'status', 
            KeyType: 'RANGE', 
        }
    ],
    AttributeDefinitions: [ // The names and types of all primary and index key attributes only
        {
            AttributeName: 'order',
            AttributeType: 'N', // (S | N | B) for string, number, binary
        },
        {
            AttributeName: 'status',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        }
    ],
    ProvisionedThroughput: { // required provisioned throughput for the table
        ReadCapacityUnits: 4, 
        WriteCapacityUnits: 1, 
    }
};
dynamodb.createTable(paramsOrder, function(err, data) {
    if (err)
        console.log(JSON.stringify(err,null,2));
        else{
            console.log(`created successfull Table_Order`);
        }
});