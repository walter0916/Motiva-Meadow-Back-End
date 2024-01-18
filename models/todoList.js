import mongoose from 'mongoose'

const Schema = mongoose.Schema

const itemSchema = new Schema({
  task: {
    type: String,
    required: true
  },
  color: {
    type: String,
    enum: ['blue', 'green', 'yellow', 'purple', 'red', 'orange', 'pink', 'white'],
    default: 'white'
  },
  timeForTasks: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false
  }
},
  {timestamps: true}
)

const toDoListSchema = new Schema({
  title: {
    type: String,
  }, 
  tasks: [itemSchema],
  deadline: {
    type: Date,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  completed: {
    type: Boolean,
    default: false
  }
},
  {timestamps: true}
)

const ToDoList = mongoose.model('ToDoList', toDoListSchema)

export { ToDoList }