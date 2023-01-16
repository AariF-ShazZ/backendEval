const mongoose = require("mongoose")

// name ==> String
// email ==> String
// gender ==> String
// password ==> String
const userSchema =  mongoose.Schema({
    name : String,
    email : String,
    gender : String,
    password : String
})

const UserModel  =  mongoose.model("user",userSchema)

module.exports={
    UserModel
}