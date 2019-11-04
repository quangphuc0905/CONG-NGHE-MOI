var port = 8888;
const express = require('express');

var session = require('express-session');
var path = require('path');
const bodyParser = require('body-parser') ;
const app = express()

var cookieParser = require('cookie-parser');
const query = require('./dynamodb/query')
var indexRouter = require('./routes/index');
var index_supplierRouter = require('./routes/index-supplier');
var checkout = require('./routes/checkout');
var admin = require('./routes/admin');
var admin_index = require('./routes/admin_index');
var index_order = require('./routes/index_order');
var detail_product = require('./routes/detail-product');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); //
const server = app.listen(port, function () {
  let host = server.address().address
  let port = server.address().port

  console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, port)
});

app.use(cookieParser());
app.use(session({
  key: 'user_id',
  secret: '123456',
  saveUninitialized: false,
  resave: false
}));
app.use((req, res, next) => {
  if (req.cookies.user_id && !req.session.user) {
      res.clearCookie('user_id');        
  }
  next();
});
app.use('/', indexRouter);
app.use('/checkout', checkout);
app.use('/supplier', index_supplierRouter);
app.use('/order', index_order);
app.use('/product', detail_product);
app.use('/admin', admin);
//app.use('/admin/signinn',admin_index)

app.use('/supplier/delete', function(req, res, next) {
  const {idProduct, nameProduct} = req.query

  query.deleteItem(idProduct, nameProduct, res);
});
app.use('/supplier/deleteorder', function(req, res, next) {
  const {order, idOrder} = req.query

  query.deleteOrder(order, idOrder, res);
});
app.use('/category', function(req, res, next) {
  const {idCategory} = req.query
  console.log(req.query+"idcategory")
  console.log(idCategory+"idcategory")
  query.searchCategory(idCategory, req, res);
});
app.post('/search', function (req, res) {
  const { nameProduct } = req.body
  if (!nameProduct) {
    res.writeHead(302, { 'Location': '/' });
    res.end();
  }
  else {
    query.searchItems(nameProduct,req, res);
  }
})

app.post('/supplier/create', function (req, res) {
  const { idProduct, nameProduct, idSupplier, nameSupplier, idCategory, price, images, description, status } = req.body
console.log(req.body, req.query)
  query.createItem(idProduct, nameProduct, idSupplier, nameSupplier, idCategory, price, images, description, status, res);
})
// app.post('/admin/signinn/add', function (req, res) {
//   const { idCategory, nameCategory } = req.body
// console.log(req.body, req.query)
//   query.createCategory( idCategory, nameCategory, res);
// })
app.post('/signup', async function (req, res) {
  const {idCustomer, nameCustomer, numberPhone, email, username, password, address } = req.body
  var a = await query.checkUserKHExist(req.body.username);
  console.log(a + "------------------")
  if(a ==true)
  {
    query.signup(idCustomer, nameCustomer, numberPhone, email, username, password, address, res)
  }else{
    res.render('err.ejs');
  }
      
  })
  app.post('/signupdn', async function (req, res) {
    const {idSupplier, nameSupplier, numberPhone, email, username, password, address } = req.body
    var a = await query.checkUserDNExist(req.body.username);
    if(a==true)
    {
      query.signupSupp(idSupplier, nameSupplier, numberPhone, email, username, password, address, res);
    }
    else{
      res.render('err.ejs');
    }
  })
  app.post('/supplier/save', function (req, res) {
    const { idProduct, nameProduct, idSupplier, nameSupplier, idCategory, price, images, description, status } = req.body
  console.log(req.body, req.query)
    query.updateItem(idProduct, nameProduct, idSupplier, nameSupplier, idCategory, price, images, description,status, res);
  })
  app.post('/supplier/update', function (req, res) {
    const { order, idOrder, status } = req.body
  console.log(req.body, req.query)
    query.updateStatus( order, idOrder, status, res);
  })
  app.post('/order/cancel', function (req, res) {
    const { order, idOrder } = req.body
  console.log(req.body, req.query)
    query.updateStatusCancel( order, idOrder, "Đã hủy", res);
  })
  app.post('/create-order', function (req, res) {
    var a = 
    {
      order : 1,
      idOrder:1,
      status : "",
      idCustomer:1,
      nameCustomer :"abc",
      addressShip : "",
      numberPhoneCus:"",
      arr : [],
      arrSL: [],
      arridSupp: []
    }
    b = req.body;
    a = b; 
    arrid =  a.arr;
    arrSupp = a.arridSupp;
    arrCount = a.arrSL;
    console.log(a);
    console.log(a.nameCustomer);
     var date = new Date();
    console.log(date);
    var keyorder = a.order;
    let j =0; 
    let t= 0;
    let k =0;
    for(let i = 0; i< arrid.length; i++)
    {
        for(; j<arrid.length;)
        {
          var idProduct = arrid[i];
          console.log(idProduct);
          break;
        }
        for(; t<arrCount.length;)
        {
          var quantity = arrCount[t];
          console.log(quantity);
          break;
        }
        for(; k<arrSupp.length;)
        {
          var idSupplier = arrSupp[k];
          console.log(idSupplier);
          break;
        }
        j++; t++; k++;
        query.createOrder(keyorder, a.status, idProduct, idSupplier, a.idCustomer, a.idOrder, quantity, a.nameCustomer, a.addressShip, a.numberPhoneCus, date, res)
        keyorder++;
      }
});
    