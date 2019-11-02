const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.loadFromPath('./awsConfig.json');

let docClient = new AWS.DynamoDB.DocumentClient();
function searchItems(nameProduct, req, res) {
    let params = {
        TableName: 'SAN_PHAM_TABLE'
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
    let queryObject = {};
    console.log();
    if (nameProduct) {
        params.FilterExpression = '#n = :nameProduct';
        params.ExpressionAttributeNames = { '#n': 'nameProduct' };
        params.ExpressionAttributeValues = { ':nameProduct': String(nameProduct) };
        docClient.scan(params, (err, data) => {
            if (err) {
                queryObject.err = err;
            } 
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
        });
    }
}
function deleteItem(idProduct, nameProduct, res) {
    let params = {
        TableName: 'SAN_PHAM_TABLE',
        Key: {
            "idProduct": Number(idProduct),
            "nameProduct": String(nameProduct)
        }
    };
    docClient.delete(params, (err, data) => {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.writeHead(302, { 'Location': '/supplier/' });
        }
        res.end();
    });
}
function searchCategory(idCategory, req, res) {
    let params = {
        TableName: 'SAN_PHAM_TABLE',
        IndexName: 'SANPHAM_LOAISP',
        KeyConditionExpression: '#idc = :c1', // a string representing a constraint on the attribute
        ExpressionAttributeNames: { // a map of substitutions for attribute names with special characters
                '#idc': 'idCategory'
        },
        ExpressionAttributeValues: { // a map of substitutions for all attribute values
                ':c1': Number(idCategory)
        },
        ScanIndexForward: false,
        ReturnConsumedCapacity: 'TOTAL',
    };
    var params1 = {
        TableName: "LOAI_SP_TABLE"
      };
      var params2 = {
        TableName: "NHA_CUNG_CAP_TABLE"
      };
      var params3 = {
        TableName: "KHACH_HANG_TABLE"
      };
        docClient.scan(params3, (err, data3) => {
            if (err) {
                console.log(err);
            } 
             let sess = req.session;
            console.log(req.session);
            if(sess.user) {
                console.log("Yes");
                docClient.scan(params3, function(err, data3){
                  if(err){
                    console.log(JSON.stringify(err));
                  }
                  else{
                    docClient.scan(params2, function(err, data2){
                      if(err){
                        console.log(JSON.stringify(err));
                      }
                      else{
                        docClient.scan(params1, function(err, data1){
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
                        docClient.query(params, function(err, data){
                          if(err){
                            console.log(JSON.stringify(err));
                          }
                          else{
                              console.log(data.Items+"data items")
                              res.render('index.ejs', { scanObject: data.Items, uname: null, cate: data1.Items, supp:data2.Items, khs: data3.Items });
                          }
                        })              }
                    })
                  }
                })
              }
        });
}
function deleteOrder(order, idOrder, res) {
    let params = {
        TableName: 'DON_HANG_TABLE',
        Key: {
            "order": Number(order),
            "idOrder": Number(idOrder)
        }
    };
    docClient.delete(params, (err, data) => {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.writeHead(302, { 'Location': '/supplier/' });
        }
        res.end();
    });
}
function createItem(idProduct, nameProduct, idSupplier, nameSupplier, idCategory, price, images, description, status, res) {
    let params = {
        TableName: 'SAN_PHAM_TABLE',
        Item: {
            idProduct: Number(idProduct),
            nameProduct: String(nameProduct),
            idSupplier: Number(idSupplier),
            nameSupplier: String(nameSupplier),
            idCategory: Number(idCategory),
            price: Number(price),
            images: String(images),
            description: String(description),
            status:String(status)
        }
        
    };
    
    docClient.put(params, (err, data) => {
        if (err) {
            res.writeHead(302, { 'Location': '/supplier' }, "Thêm thất bại");
            res.write('Thêm thất bại');
        }
        else {
            
            res.writeHead(302, { 'Location': '/supplier'});
            
        }
        res.end();
    });
}
function createCategory(idCategory, nameCategory, res) {
    let params = {
        TableName: 'LOAI_SP_TABLE',
        Item: {
            idCategory: Number(idCategory),
            nameCategory: String(nameCategory)
        }
        
    };
    docClient.put(params, (err, data) => {
        if (err) {
            res.writeHead(302, { 'Location': '/admin/signinn' }, "Thêm thất bại");
            res.write('Thêm thất bại');
        }
        else {
            
            res.writeHead(302, { 'Location': '/admin/signinn'});
            
        }
        res.end();
    });
}
function updateItem(idProduct, nameProduct, idSupplier, nameSupplier, idCategory, price, images, description, status, res) {
    let params = {
        TableName: 'SAN_PHAM_TABLE',
        Key: {
            "idProduct": Number(idProduct),
            "nameProduct": String(nameProduct)
        },
        UpdateExpression: "set #p = :price, #i = :images, #d = :description, #ids = :idSupplier, #n = :nameSupplier, #idc = :idCategory, #sta = :status",
        ExpressionAttributeNames: {
            '#p': 'price',
            '#i': 'images',
            '#d': 'description',
            '#ids': 'idSupplier',
            '#n': 'nameSupplier',
            '#idc': 'idCategory',
            '#sta': 'status'
        },
        ExpressionAttributeValues: {
            ':price': Number(price),
            ':images': String(images),
            ':description': String(description),
            ':idSupplier': Number(idSupplier),
            ':nameSupplier': String(nameSupplier),
            ':idCategory': Number(idCategory),
            ':status': String(status)
        },
        ReturnValues: "UPDATED_NEW"
    };
    docClient.update(params, (err, data) => {
        if (err) {
            res.write('<h5 style="color:red;">All fields are required!</h5>');
        } else {
            res.writeHead(302, { 'Location': '/supplier' });
        }
        res.end();
    })
}

function updateStatus(order, idOrder, status, res) {
    let params = {
        TableName: 'DON_HANG_TABLE',
        Key: {
            "order": Number(order),
            "idOrder": Number(idOrder)
        },
        UpdateExpression: "set #s = :status",
        
        ExpressionAttributeNames: {
            '#s': 'status'
        },
        ExpressionAttributeValues: {
            ':status': String(status)
        },
        ReturnValues: "UPDATED_NEW"
    };
    docClient.update(params, (err, data) => {
        if (err) {
            res.write('err');
        } else {
            res.writeHead(302, { 'Location': '/supplier' });
        }
        res.end();
    })
}
function updateStatusCancel(order, idOrder, status, res) {
    let params = {
        TableName: 'DON_HANG_TABLE',
        Key: {
            "order": Number(order),
            "idOrder": Number(idOrder)
        },
        UpdateExpression: "set #s = :status",
        
        ExpressionAttributeNames: {
            '#s': 'status'
        },
        ExpressionAttributeValues: {
            ':status': String(status)
        },
        ReturnValues: "UPDATED_NEW"
    };
    docClient.update(params, (err, data) => {
        if (err) {
            res.write('err');
        } else {
            res.writeHead(302, { 'Location': '/order' });
        }
        res.end();
    })
}

function signup(idCustomer, nameCustomer, numberPhone, email, username, password, address, res) {
  let params = {
      TableName: 'KHACH_HANG_TABLE',
      Item: {
          idCustomer: Number(idCustomer),
          nameCustomer: String(nameCustomer),
          numberPhone: String(numberPhone),
          email: String(email),
          username: String(username),
          password: String(password),
          address:String(address)
      }
  };
  docClient.put(params, (err, data) => {
      if (err) {
          res.writeHead(302, { 'Location': '/' }, "Thêm thất bại");
      }
      else {
        
          res.writeHead(302, { 'Location': '/' }, "Thêm Thành Công");
          
      }
      res.end();
  });
  
}

function signupSupp(idSupplier, nameSupplier, numberPhone, email, username, password, address, res) {
    let params = {
        TableName: 'NHA_CUNG_CAP_TABLE',
        Item: {
            idSupplier: Number(idSupplier),
            nameSupplier: String(nameSupplier),
            numberPhone: String(numberPhone),
            email: String(email),
            username: String(username),
            password: String(password),
            address: String(address)
        }
    };
    docClient.put(params, (err, data) => {
        if (err) {
            res.writeHead(302, { 'Location': '/' }, "Thêm thất bại");
        }
        else {
            res.writeHead(302, { 'Location': '/' }, "Thêm Thành Công");
        }
        res.end();
    });
    
  }

  function createOrder(order, status, idProduct, idSupplier, idCustomer, idOrder, quantity, nameCustomer, addressShip, numberPhoneCus, orderDate, res) {
    let params = {
        TableName: 'DON_HANG_TABLE',
        Item: {
          order: Number(order),
          status: String(status),
          idProduct :Number(idProduct),
          idSupplier:Number(idSupplier),
          idCustomer: Number(idCustomer),
          idOrder: Number(idOrder),
          quantity: Number(quantity),
          nameCustomer: String(nameCustomer),
          addressShip: String(addressShip),
          numberPhoneCus: String(numberPhoneCus),
          orderDate: String(orderDate)
        }
        
    };
    
    docClient.put(params, (err, data) => {
        if (err) {
            //res.writeHead(302, { 'Location': '/checkout' }, "Thêm thất bại");
            res.write('Thêm thất bại');
            console.log("Bi loi")
        }
        else {
            
            //res.writeHead(302, { 'Location': '/checkout'});
            console.log("Thanh cong roi")
        }
        res.end();
    });
}
// kiểm tra username da ton tai hay chua
async function checkUserKHExist(username) {
   try{
    var data = await docClient.scan({
        TableName: 'KHACH_HANG_TABLE',
        FilterExpression: 'username = :username',
        ExpressionAttributeValues: {':username' : username}
    }).promise();
    console.log(data.Items);
    if(data.Items.length>0)
        return false;
    return true;
}
catch(err){
    console.log(err)
    return false;
}
}
async function checkUserDNExist(username) {
    try{
     var data = await docClient.scan({
         TableName: 'NHA_CUNG_CAP_TABLE',
         FilterExpression: 'username = :username',
         ExpressionAttributeValues: {':username' : username}
     }).promise();
     console.log(data.Items);
     if(data.Items.length>0)
         return false;
     return true;
 }
 catch(err){
     console.log(err)
     return false;
 }
 }
// function xem và cập nhật tình trạng đơn hàng

module.exports = {
    searchItems: searchItems,
    deleteItem: deleteItem,
    createItem: createItem,
    signup: signup,
    signupSupp:signupSupp,
    updateItem: updateItem,
    createOrder:createOrder,
    checkUserKHExist: checkUserKHExist,
    updateStatus :updateStatus,
    checkUserDNExist: checkUserDNExist,
    updateStatusCancel: updateStatusCancel,
    deleteOrder : deleteOrder,
    searchCategory: searchCategory,
    createCategory :createCategory
};