const express = require("express")
require("dotenv").config()
const cors =  require("cors")
const {connection } = require("./configs/db")
const {userRoutes} =require("./routes/User.route")
const {noteRoutes} = require("./routes/Note.route")
const {authenticate} = require("./middlewares/authenticate.middleware")
const app = express()
// npm i cors
app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.get("/" , (req,res) => {
    res.send("WELCOME!")
})

app.use("/user",userRoutes)
app.use(authenticate)
app.use("/note",noteRoutes)


app.listen(process.env.port, async () => {

    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log(" Trouble connecting to the DB")
        console.log(err);
    }
   
})