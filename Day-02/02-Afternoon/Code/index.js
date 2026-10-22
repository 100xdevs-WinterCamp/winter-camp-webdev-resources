const express = require('express');
const { z } = require("zod");
const mongoose = require("mongoose")

async function connectDB() {
  await mongoose.connect(
    process.env.MONGODB_URI
  );

  console.log("MongoDB connected successfully");
}

const TodoSchema =  new mongoose.Schema({
    title: String,
    description: String,
})

const Todo = mongoose.model("Todo", TodoSchema);


const CreateTodoSchema = z.object({
  title: z.string().min(1).max(30),
  description: z.string().min(1).max(100)
});

const app = express() // instance of a server

app.use(express.json()) //middleware.

let notes = []


app.post("/notes", async (req, res) => { // create an entry in server
    try {
    const {data , success} = CreateTodoSchema.safeParse(req.body)
    if(!success){
        res.status(400).json({
            message: "Input error"
        })
    }

    const result = await Todo.create({
        title: data.title,
        description: data.description
    })

    res.status(201).json({
        sucess: true,
        message: "TODO CREATED SUCCESSFULLY",
        data: []
    })
        
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
})

app.get("/notes", async (req, res)=> {   // fetch the data in server

    let result = await Todo.find();

    res.status(200).json({
        success: true,
        message: "Fetch successfully",
        data: result
    })
})

app.put("/notes/:id" , async (req, res ) => {
    const index = req.params.id

    let result = await Todo.findOneAndUpdate({
        _id : index
    }, {
        title: "CHANGED"
    })

    res.status(200).json({
        message: "DONE"
    })
})

app.delete("/notes/:id" , (req,res) => {
    const index = req.params.id
    delete notes[index]
    res.status(200).json({
        message: "Delete successfull"
    })
})


connectDB()
app.listen(3000) // run the server 

// persistant -> Database (mongoDB)
// zod  -> validation

//DATABASE