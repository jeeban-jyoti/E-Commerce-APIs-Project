const express = require('express');
const { addUser } = require('./database')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

const PORT = 8000;

//Auth APIs
app.post('/api/auth/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const type = req.body.type;

    const response = await addUser(username, password, type);
    res.send(response);
});

app.post('/api/auth/login', (req, res) => {

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