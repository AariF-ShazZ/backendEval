const express = require("express")
const {NoteModel} = require("../models/Note.model")
const noteRoutes =  express.Router()

noteRoutes.get("/", async(req,res) => {
    try{
        const allNotes =  await NoteModel.find()
        // console.log(allNotes);
        res.send(allNotes)
    }catch(err){
        console.log(err);
        res.send({"msg":"Something went wrong"})
    }
   
})
noteRoutes.post("/create", async(req,res) => {
    const payload=  req.body
    try{
        const new_Notes =  new NoteModel(payload)
        await new_Notes.save()
        res.send("Created the notes")
    }catch(err){
        console.log(err);
        res.send({"msg":"Something went wrong"})
    }

})

noteRoutes.patch("/update/:id", async(req,res) => {
    const id =  req.params.id
    const payload =  req.body
    const note =  await NoteModel.findOne({"_id":id})
    const userID_in_note =  note.userID
    const userID_making_req =  req.body.userID
    try{
        if(userID_making_req !==userID_in_note){
            res.send({"msg":"You are not authorized"})
        }else {
            await NoteModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Updated the notes")
        }
          
    }catch(err){
        console.log(err);
        res.send({"msg":"Something went wrong"})
    }
    
})

noteRoutes.delete("/delete/:id",async(req,res) => {
    const id =  req.params.id
    const note =  await NoteModel.findOne({"_id":id})
    const userID_in_note =  note.userID
    const userID_making_req =  req.body.userID
    try{
        if(userID_making_req !==userID_in_note){
            res.send({"msg":"You are not authorized"})
        }else {
            await NoteModel.findByIdAndDelete({"_id":id})
            res.send("Deleted the note")
        }
          
    }catch(err){
        console.log(err);
        res.send({"msg":"Something went wrong"})
    }
   
})



module.exports={noteRoutes}