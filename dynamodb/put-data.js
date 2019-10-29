const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
    region: 'local',
    endpoint: 'http://localhost:8000'
});
let docClient = new AWS.DynamoDB.DocumentClient();
console.log('Start importing');

let allProduct = JSON.parse(fs.readFileSync(__dirname + '/sanpham.json', 'utf-8'));
allProduct.forEach((product) => {
    let params = {
        TableName: "SAN_PHAM_TABLE",
        Item: {
            "idProduct" : product.idProduct,
            "nameProduct" : product.nameProduct,
            "idSupplier": product.idSupplier,
            "nameSupplier" : product.nameSupplier,
            "idCategory" : product.idCategory,
            "price" : product.price,
            "images" : product.images,
            "description": product.description
        }
    };
    docClient.put(params, (err, data) => {
        if (err) {
            console.error(`Unable to add ${product.nameProduct}, ${JSON.stringify(err, null, 2)}`);
        } else {
            console.log(`created ${product.nameProduct}`);
        }
    });
});
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
let allUserSupplier = JSON.parse(fs.readFileSync(__dirname + '/user_supplier.json', 'utf-8'));

allUserSupplier.forEach((user_supp) => {
    let params = {
        TableName: "NHA_CUNG_CAP_TABLE",
        Item: {
            "idSupplier": user_supp.idSupplier,
            "nameSupplier": user_supp.nameSupplier,
            "username": user_supp.username,
            "password": user_supp.password,
            "numberPhone" : user_supp.numberPhone,
            "email": user_supp.email,
            "address": user_supp.address
        }
    };
    docClient.put(params, (err, data) => {
        if (err) {
            console.error(`Unable to add user ${user_supp.username}, ${JSON.stringify(err, null, 2)}`);
        } else {
            console.log(`Usersupp created ${user_supp.username}`);
        }
    });
});

let allCategory = JSON.parse(fs.readFileSync(__dirname + '/category.json', 'utf-8'));

allCategory.forEach((cate) => {
    let params = {
        TableName: "LOAI_SP_TABLE",
        Item: {
            "idCategory": cate.idCategory,
            "nameCategory": cate.nameCategory
        }
    };
    docClient.put(params, (err, data) => {
        if (err) {
            console.error(`Unable to add user ${cate.nameCategory}, ${JSON.stringify(err, null, 2)}`);
        } else {
            console.log(`User created ${cate.nameCategory}`);
        }
    });
});
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
