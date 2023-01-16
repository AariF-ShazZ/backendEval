const mongoose =  require("mongoose")


// title ==> String
// body ==> String
// device ==> String
const noteSchema =  mongoose.Schema({
    "title" : String,
    "body" : String,
    "device" : String,
    "userID":String
})

const NoteModel =  mongoose.model("note",noteSchema)
module.exports = {
    NoteModel
}