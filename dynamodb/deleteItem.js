var AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.loadFromPath('./awsConfig.json');

let docClient = new AWS.DynamoDB.DocumentClient();
let allUserKH = JSON.parse(fs.readFileSync(__dirname + '/user_kh.json', 'utf-8'));

allUserKH.forEach((user_kh) => {
    let params = {
        TableName: "KHACH_HANG_TABLE",
        Item: {
            "idCustomer": user_kh.idCustomer,
            "nameCustomer": user_kh.nameCustomer,
            "username": user_kh.username,
            "password": user_kh.password,
            "numberPhone" : user_kh.numberPhone,
            "email": user_kh.email,
            "address": user_kh.address
        }
    };
    docClient.put(params, (err, data) => {
        if (err) {
            console.error(`Unable to add user ${user_kh.username}, ${JSON.stringify(err, null, 2)}`);
        } else {
            console.log(`User created ${user_kh.username}`);
        }
    });
});