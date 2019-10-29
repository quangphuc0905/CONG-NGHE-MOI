const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
    region: 'local',
    endpoint: 'http://localhost:8000'
});
let docClient = new AWS.DynamoDB.DocumentClient();
console.log('Start importing');

let allOrder = JSON.parse(fs.readFileSync(__dirname + '/order.json', 'utf-8'));

allOrder.forEach((ord) => {
    let params = {
        TableName: "DON_HANG_TABLE",
        Item: {
            "order": ord.order,
            "status": ord.status,
            "idProduct" :ord.idProduct,
            "idSupplier":ord.idSupplier,
            "idCustomer": ord.idCustomer,
            "idOrder":ord.idOrder,
            "quantity":ord.quantity,
            "nameCustomer":ord.nameCustomer,
            "addressShip": ord.addressShip,
            "numberPhoneCus": ord.numberPhoneCus,
            "orderDate":ord.orderDate
        }
    };
    docClient.put(params, (err, data) => {
        if (err) {
            console.error(`Unable to add user ${ord.order}, ${JSON.stringify(err, null, 2)}`);
        } else {
            console.log(`order created ${ord.order}`);
        }
    });
});
