var AWS = require('aws-sdk');

AWS.config.loadFromPath('./awsConfig.json');
let dynamodb = new AWS.DynamoDB();
var paramsProducts = {
    TableName: 'SAN_PHAM_TABLE',
    KeySchema: [
        {
            AttributeName: 'idProduct',
            KeyType: 'HASH'
        },
        {
            AttributeName: 'nameProduct', 
            KeyType: 'RANGE'
        }
    ],
    AttributeDefinitions: [
        {
            AttributeName: 'idProduct',
            AttributeType: 'N' // (S | N | B) for string, number, binary
        },
        {
            AttributeName: 'nameProduct',
            AttributeType: 'S' // (S | N | B) for string, number, binary
        }
    ],
    ProvisionedThroughput: { // required provisioned throughput for the table
        ReadCapacityUnits: 4, 
        WriteCapacityUnits: 1
    }
    
};
dynamodb.createTable(paramsProducts, function(err, data) {
    if (err)
        console.log(JSON.stringify(err,null,2));
    else{
        console.log(`created successfull Table_Product`);
    }
});

var paramsUserKH = {
    TableName: 'KHACH_HANG_TABLE',
    KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
        { // Required HASH type attribute
            AttributeName: 'username',
            KeyType: 'HASH',
        },
        { // Optional RANGE key type for HASH + RANGE tables
            AttributeName: 'idCustomer', 
            KeyType: 'RANGE', 
        }
    ],
    AttributeDefinitions: [ // The names and types of all primary and index key attributes only
        {
            AttributeName: 'username',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        },
        {
            AttributeName: 'idCustomer',
            AttributeType: 'N', // (S | N | B) for string, number, binary
        }
    ],
    ProvisionedThroughput: { // required provisioned throughput for the table
        ReadCapacityUnits: 4, 
        WriteCapacityUnits: 1, 
    }
};
dynamodb.createTable(paramsUserKH, function(err, data) {
    if (err)
        console.log(JSON.stringify(err,null,2));
        else{
            console.log(`created successfull Table_UserKH`);
        }
});
var paramsUserNCC = {
    TableName: 'NHA_CUNG_CAP_TABLE',
    KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
        { // Required HASH type attribute
            AttributeName: 'username',
            KeyType: 'HASH',
        },
        { // Optional RANGE key type for HASH + RANGE tables
            AttributeName: 'idSupplier', 
            KeyType: 'RANGE', 
        }
    ],
    AttributeDefinitions: [ // The names and types of all primary and index key attributes only
        {
            AttributeName: 'username',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        },
        {
            AttributeName: 'idSupplier',
            AttributeType: 'N', // (S | N | B) for string, number, binary
        }
    ],
    ProvisionedThroughput: { // required provisioned throughput for the table
        ReadCapacityUnits: 4, 
        WriteCapacityUnits: 1, 
    }
};
dynamodb.createTable(paramsUserNCC, function(err, data) {
    if (err)
        console.log(JSON.stringify(err,null,2));
        else{
            console.log(`created successfull Table_UserSupplier`);
        }
});
var paramsCategory = {
    TableName: 'LOAI_SP_TABLE',
    KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
        { // Required HASH type attribute
            AttributeName: 'idCategory',
            KeyType: 'HASH',
        },
        { // Optional RANGE key type for HASH + RANGE tables
            AttributeName: 'nameCategory', 
            KeyType: 'RANGE', 
        }
    ],
    AttributeDefinitions: [ // The names and types of all primary and index key attributes only
        {
            AttributeName: 'idCategory',
            AttributeType: 'N', // (S | N | B) for string, number, binary
        },
        {
            AttributeName: 'nameCategory',
            AttributeType: 'S', // (S | N | B) for string, number, binary
        }
    ],
    ProvisionedThroughput: { // required provisioned throughput for the table
        ReadCapacityUnits: 4, 
        WriteCapacityUnits: 1, 
    }
};
dynamodb.createTable(paramsCategory, function(err, data) {
    if (err)
        console.log(JSON.stringify(err,null,2));
        else{
            console.log(`created successfull Table_Category`);
        }
});

var paramsOrder = {
    TableName: 'DON_HANG_TABLE',
    KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
        { // Required HASH type attribute
            AttributeName: 'order',
            KeyType: 'HASH',
        },
        { // Optional RANGE key type for HASH + RANGE tables
            AttributeName: 'idOrder', 
            KeyType: 'RANGE', 
        }
    ],
    AttributeDefinitions: [ 
        {
            AttributeName: 'order',
            AttributeType: 'N', // (S | N | B) for string, number, binary
        },
        {
            AttributeName: 'idOrder',
            AttributeType: 'N', // (S | N | B) for string, number, binary
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