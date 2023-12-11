const mongoose = require("mongoose");

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

const seller = {
    username: String,
    password: String,
    catalog: Array,
    orders: Array
};
const buyer = {
    username: String,
    password: String,
    orders: Array
};
const SELLER_DATA = mongoose.model("sellerdata", seller);
const BUYER_DATA = mongoose.model("buyerdata", buyer);


async function addUser(username, password, usertype){
    if(usertype == 'seller'){
        try{
            const check = await SELLER_DATA.find({username: username});
            if(check.length == 0){
                var seller = new SELLER_DATA({
                    username: username,
                    password: password,
                    catalog: [],
                    orders: []
                })
                seller.save();
                return {message: "user (seller) created: " + username}
            }
            else{
                return {message: "user already exists"};
            }
        }catch{
            return {message: "error occured, user not created"}
        }
    }
    else if(usertype == 'buyer'){
        try{
            const check = await BUYER_DATA.find({username: username});
            if(check.length == 0){
                var buyer = new BUYER_DATA({
                    username: username,
                    password: password,
                    orders: []
                })
                buyer.save();
                return {message: "user (buyer) created: " + username}
            }
            else{
                return {message: "user already exists"};
            }
        }catch{
            return {message: "error occured, user not created"}
        }
    }
}

//===================================================================



module.exports = {addUser}