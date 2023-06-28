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
    completed: Boolean,
    default: Boolean
})


const TodoItem = mongoose.model("TodoItem", todoItemSchema)

const setDefaultTodoItems = () => {
    const item0 = new TodoItem({
        todo: "These initial todos were inserted to DB by default",
        completed: true,
        default: true
    })

    const item1 = new TodoItem({
        todo: "Store data in database",
        completed: false,
        default: true
    })

    const item2 = new TodoItem({
        todo: "Read items from db...",
        completed: false,
        default: true
    })

    const item3 = new TodoItem({
        todo: "Update current item in db...",
        completed: false,
        default: true
    })

    const defaultItems = [item0, item1, item2, item3]

    TodoItem.insertMany(defaultItems).catch()
}

TodoItem.find({ default: true }).then((items) => {
    if (items.length === 0) {
        setDefaultTodoItems()
    }
})

app.get("/todos", (req, res) => {
    TodoItem.find().then(data => res.send(data))
})

app.post("/deletetodo/:id", (req, res) => {
    const todoId = req.params.id
    TodoItem.findOne({ _id: todoId }).then(item => {
        TodoItem.deleteOne({ _id: item._id })
            .then(() => res.send())
            .catch(e => console.log(e))
    }).catch(e => console.log(e))
})

app.post("/addtodo/:todo", (req, res) => {
    const todo = decodeURI(req.params.todo)
    const addItem = new TodoItem({
        todo: todo,
        completed: false
    })
    TodoItem.create(addItem).then(() => res.send()).catch(e => console.error(e))
})

app.post("/updatetodos/:id", (req, res) => {
    const todoId = req.params.id

    TodoItem.findOne({ _id: todoId }).then((item) => {
        TodoItem.updateOne({ _id: item._id }, { $set: { completed: !item.completed } }).then(() => {
            res.send()
        })
    })
})

app.listen(3001, () => {
    console.log("Todo list server is running on http://localhost:3001")
})