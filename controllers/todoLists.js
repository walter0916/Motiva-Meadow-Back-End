import { ToDoList } from "../models/todoList.js"

async function index(req, res){
  try {
    const todoLists = await ToDoList.find({author: req.params.profileId})
      .populate('tasks')
      .sort({ createdAt: 'asc' })
    res.status(200).json(todoLists) 
  } catch (error) {
    res.status(500).json(error)
  }
}

async function create(req, res){
  try {
    req.body.author = req.params.profileId
    const todoList = await ToDoList.create(req.body)
    res.status(201).json(todoList)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function addTask(req, res){
  try {
    console.log('Start of addTask function');
    const todoListId = req.params.listId
    const list = await ToDoList.findById(todoListId)
    const task = req.body
    list.tasks.push(task)
    await list.save()
    const newTask = list.tasks[list.tasks.length - 1]
    res.status(200).json(newTask)
  } catch (error) {
    console.error('Error in addTask function:', error);

    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

async function update(req, res){
  try {
    const todoList = await ToDoList.findByIdAndUpdate(
      req.params.todoId,
      req.body,
      { new: true }
    )
    res.status(200).json(todoList)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function updateTaskCompleted(req, res) {
  try {
    const todoListId = req.params.listId
    const taskId = req.params.taskId
    const completedValue = req.body.completed
    const todoList = await ToDoList.findById(todoListId)
    const taskIndex = todoList.tasks.findIndex(task => task._id.equals(taskId))
    todoList.tasks[taskIndex].completed = completedValue
    await todoList.save()
    res.status(200).json(todoList)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteList(req, res){
  try {
    const todoList = await ToDoList.findByIdAndDelete(req.params.todoId)
    res.status(200).json(todoList)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteTask(req, res){
  try {
    const todoList = await ToDoList.findById(req.params.listId)
    const taskIndex = todoList.tasks.findIndex(task => task._id.toString() === req.params.taskId)
    todoList.tasks.splice(taskIndex, 1)
    await todoList.save()
    res.status(200).json(todoList)
  } catch (error) {
    res.status(500).json(error)    
  }
}

export {
  index,
  create,
  addTask,
  update,
  updateTaskCompleted,
  deleteList as delete,
  deleteTask
}