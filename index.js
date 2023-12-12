const express = require('express');
const { addUser, userLoginWithCred, userLoginWithToken, getSellerList, getSellerCatalog, addOrders, setCatalog, getOrders } = require('./database')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

const PORT = 8000;

//Auth APIs
app.post('/api/auth/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const type = req.body.usertype;

    const response = await addUser(username, password, type);
    console.log(response);
    res.send(response);
});

app.post('/api/auth/login', async (req, res) => {
    const token = req.body.authToken;
    const username = req.body.username;
    const password = req.body.password;
    const type = req.body.usertype;
    var response = {};

    if(token == null){
        response = await userLoginWithCred(username, password, type);
        console.log("tokenless", response)
    }
    else{
        response = await userLoginWithToken(token, type);
        console.log("token")
    }
    console.log(response);
    res.send(response);

});

//APIs for Buyers

app.get('/api/buyer/list-of-sellers', async (req, res) => {
    const sellerlist = await getSellerList();
    res.send(sellerlist);
});

app.get('/api/buyer/seller-catalog/:seller_id', async (req, res) => {
    const seller_id = req.params.seller_id;
    
    const response = await getSellerCatalog(seller_id);
    res.send(response);
});

app.post('/api/buyer/create-order/:seller_id', async (req, res) => {
    const buyer = req.body.buyer;
    const orders = req.body.orders;
    const seller = req.params.seller_id;

    const response = await addOrders(seller, buyer, orders);
    res.send(response);
});

//APIs for Sellers

app.post('/api/seller/create-catalog', async (req, res) => {
    const token = req.body.authToken;
    const products_list = req.body.products_list;

    const response = await setCatalog(token, products_list);
    res.send(response);
});

app.get('/api/seller/orders', async (req, res) => {
    const seller_id = req.query.seller_id;

    const response = await getOrders(seller_id);
    res.send(response);
});

app.listen(PORT, function(){
    console.log("server started at port " + PORT);
})