const express = require('express');
const { addUser, userLoginWithCred, userLoginWithToken } = require('./database')

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

    res.send(response);

});

//APIs for Buyers

app.get('/api/buyer/list-of-sellers', (req, res) => {

});

app.get(' /api/buyer/seller-catalog/:seller_id', (req, res) => {

});

app.post('/api/buyer/create-order/:seller_id', (req, res) => {

});

//APIs for Sellers

app.post('/api/seller/create-catalog', (req, res) => {

});

app.get('/api/seller/orders', (req, res) => {

});

app.listen(PORT, function(){
    console.log("server started at port " + PORT);
})