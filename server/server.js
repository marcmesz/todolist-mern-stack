const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect("mongodb://localhost:27017/todolistDB")

const todoItemSchema = mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    completed: Boolean
})


const TodoItem = mongoose.model("TodoItem", todoItemSchema)

/* const item0 = new TodoItem({
    todo: "These initial todos were inserted to DB by default",
    completed: true
})

const item1 = new TodoItem({
    todo: "Store data in database",
    completed: false
})

const item2 = new TodoItem({
    todo: "Read items from db...",
    completed: false
})

const item3 = new TodoItem({
    todo: "Update current item in db...",
    completed: false
})

const defaultItems = [item0, item1, item2, item3]

TodoItem.insertMany(defaultItems).catch() */


app.get("/todos", (req, res) => {
    TodoItem.find().then(data => res.send(data))
})

app.post("/deletetodo/:id", (req, res) => {
    res.send("Delete...")
})

app.post("/addtodo", (req, res) => {
    res.send("Add....")
})

app.post("/updatetodos/:id", (req, res) => {
    const todoId = req.params.id
    TodoItem.findOne({ _id: todoId }).then(item => {
        TodoItem.updateOne({ _id: todoId }, { $set: { completed: !item.completed } }).catch()
    })
})

app.listen(3001, () => {
    console.log("Todo list server is running on http://localhost:3001")
})