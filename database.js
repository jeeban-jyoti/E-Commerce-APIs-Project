const mongoose = require("mongoose");
const crypto = require("crypto")

mongoose.connect("mongodb://localhost:27017/UserData", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
/*
const contactSchema = {
    roomLink: String,
    users: Array,
    public: Boolean
};
const DATA = mongoose.model("livechatapplication", contactSchema);

function adddUser(url, userdata){
    DATA.find({roomLink: url}).
    then(result=>{
        result[0].users.push(userdata)
        result[0].save()
        console.log(result)
    })
}

function removeUser(userid){
    DATA.find().
    then(result=>{
        result.forEach(room => {
            (room.users).forEach(element => {
            if(element[0] == userid){
                result[0].users.pop(element)
                console.log(result)
                room.save()
            }
            });
        });
    })
}

function deleteRoom(url){
    DATA.deleteOne({roomLink: url}).
    then(result=>{
        console.log("deleted ", url)
    })
}
*/
//===================================================================

function hash(key){
    let Digest = crypto.createHash('sha256').update(key).digest("base64");
    return Digest;
}

function tokenGenerator(key){
     return crypto.randomBytes(20).toString('hex');
}

const seller = {
    username: String,
    password: String,
    catalog: Array,
    orders: Array,
    token: String
};
const buyer = {
    username: String,
    password: String,
    orders: Array,
    token: String
};
const SELLER_DATA = mongoose.model("sellerdata", seller);
const BUYER_DATA = mongoose.model("buyerdata", buyer);


async function addUser(username, password, usertype){
    if(usertype == 'seller'){
        try{
            const check = await SELLER_DATA.find({username: username});
            if(check.length == 0){
                const authToken = tokenGenerator();
                var seller = new SELLER_DATA({
                    username: username,
                    password: password,
                    catalog: [],
                    orders: [],
                    token: hash(authToken)
                });
                seller.save();
                return {authToken: authToken, message: "user (seller) created: " + username};
            }
            else{
                return {message: "user already exists"};
            }
        }catch{
            return {message: "error occured, user not created"};
        }
    }
    else if(usertype == 'buyer'){
        try{
            const check = await BUYER_DATA.find({username: username});
            if(check.length == 0){
                const authToken = tokenGenerator()
                var buyer = new BUYER_DATA({
                    username: username,
                    password: password,
                    orders: [],
                    token: hash(authToken)
                });
                buyer.save();
                return {authToken: authToken, message: "user (buyer) created: " + username};
            }
            else{
                return {message: "user already exists"};
            }
        }catch{
            return {message: "error occured, user not created"};
        }
    }
}

async function userLoginWithCred(username, password, usertype){
    if(usertype == 'seller'){
        try{
            const getcred = await SELLER_DATA.find({username: username});
            if(getcred.length == 0){
                return {username: username, access_allowed: false, message: "user not found, login failed"}
            }
            if(getcred[0].password == password){
                return {username: username, access_allowed: true, message: "user access granted"}
            }
            else{
                return {username: username, access_allowed: false, message: "wrong credentials, login failed"}
            }
        }catch{
            return {username: username, access_allowed: false, message: "error occured, user login failed"}
        }
    }
    else if(usertype == 'buyer'){
        try{
            const getcred = await BUYER_DATA.find({username: username});
            if(getcred.length == 0){
                return {username: username, access_allowed: false, message: "user not found, login failed"}
            }
            if(getcred[0].password == password){
                return {username: username, access_allowed: true, message: "user access granted"}
            }
            else{
                return {username: username, access_allowed: false, message: "wrong credentials, login failed"}
            }
        }catch{
            return {username: username, access_allowed: false, message: "error occured, user login failed"}
        }
    }
}
async function userLoginWithToken(token, usertype){
    if(usertype == 'seller'){
        try{
            const getcred = await SELLER_DATA.find({token: hash(token)});
            if(getcred.length == 0){
                return {username: "", access_allowed: false, message: "user not found, login failed"}
            }
            else{
                return {username: getcred[0].username, access_allowed: true, message: "user (seller) access granted"}
            }
        }catch{
            return {username: "", access_allowed: false, message: "error occured, user login failed"}
        }
    }
    else if(usertype == 'buyer'){
        try{
            const getcred = await BUYER_DATA.find({token: hash(token)});
            if(getcred.length == 0){
                return {username: "", access_allowed: false, message: "user not found, login failed"}
            }
            else{
                return {username: getcred[0].username, access_allowed: true, message: "user (buyer) access granted"}
            }
        }catch{
            return {username: "", access_allowed: false, message: "error occured, user login failed"}
        }
    }
}

//===================================================================



module.exports = {addUser, userLoginWithCred, userLoginWithToken}