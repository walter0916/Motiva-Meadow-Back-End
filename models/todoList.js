import mongoose from "mongoose"

const Schema = mongoose.Schema

const itemSchema = new Schema({
  task: {
    type: String,
    required: true
  },
  color: {
    type: String,
    enum: ["blue", "green", "yellow", "purple", "red", "orange", "pink"],
    default: 'white'
  }
},
  {timestamps: true}
)

const toDoListSchema = new Schema({
  title: String, 
  tasks: [itemSchema],
  type: {
    type: String,
    enum: ['daily', 'weekly', 'custom'],
    required: true,
    default: 'daily'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Profile"
  }
},
  {timestamps: true}
)

const ToDoList = mongoose.model('ToDoList', toDoListSchema)

export { ToDoList }