const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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

app.route("/todo")
    .get((req, res) => {
        TodoItem.find().then(data => res.send(data))
    })
    .delete((req, res) => {
        if (req.body.id) {
            TodoItem.findOneAndDelete({ _id: req.body.id }).then(() => res.send())
        }
        else {
            TodoItem.deleteMany({}).then(() => res.send())
        }
    })
    .post((req, res) => {
        const addItem = new TodoItem({
            todo: req.body.todo,
            completed: req.body.completed
        })
        addItem.save()
        res.send()
    })
    .put((req, res) => {
        TodoItem.findOne({ _id: req.body.id }).then((item) => {
            TodoItem.updateOne({ _id: item._id }, { $set: { completed: !item.completed } })
                .then(() => {
                    res.send()
                })
        })
    })

app.listen(3001, () => {
    console.log("Todo list server is running on http://localhost:3001")
})