// git remote add origin https://github.com/AariF-ShazZ/backendEval.gitconst jwt =  require("jsonwebtoken")
// 
const authenticate =  (req,res, next) => {
        const token =  req.headers.authorization

        if(token){
            const decoded =  jwt.verify(token,process.env.key)
            console.log("decoded =>",decoded);
            if(decoded){
                const userID= decoded.userID
                req.body.userID=userID
                next()
            }else{
                res.send("Please Login First!")
            }
        }else {
            res.send("Please Login First!")
        }
}

module.exports={authenticate}