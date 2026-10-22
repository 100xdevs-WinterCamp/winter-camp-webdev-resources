const express = require('express');

const app = express() // instance of a server

app.use(express.json()) //middleware.

let notes = []

// note = {
//     title: "Note 1",
//     description: "This is the first note"
// }



/*
notes = [{
    title: "Note 1",
    description: "This is the first note"
}, {
    title: "Note 2",
    description: "This is the second note"
}]
*/

app.post("/notes", (req, res) => { // create an entry in server
    notes.push(req.body)
    res.status(201).json({
        sucess: true,
        message: "TODO CREATED SUCCESSFULLY",
        data: []
    })
})

app.get("/notes", (req, res)=> {   // fetch the data in server
    res.send(notes)
    res.status(200).json({
        success: true,
        message: "Fetch successfully",
        data: notes
    })
})

app.put("/notes/:id" , (req, res ) => {
    //update the notes object
    const index = req.params.id
    notes[index].title = req.body.title

    res.status(200).json({
        message: "hehe"
    })
})

app.delete("/notes/:id" , (req,res) => {
    const index = req.params.id
    delete notes[index]
    res.status(200).json({
        message: "Delete successfull"
    })
})


app.listen(3000) // run the server 

// persistant -> Database (mongoDB)
// zod  -> validation