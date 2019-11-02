var AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.loadFromPath('./awsConfig.json');

let docClient = new AWS.DynamoDB.DocumentClient();
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
