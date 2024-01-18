import { ToDoList } from "../models/todoList.js"

async function index(req, res){
  try {
    const todoLists = await ToDoList.find({author: req.params.profileId})
      .populate('tasks')
      .sort({ createdAt: 'desc' })
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

async function deleteList(req, res){
  try {
    const todoList = await ToDoList.findByIdAndDelete(req.params.todoId)
    res.status(200).json(todoList)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  index,
  create,
  update,
  deleteList as delete,
}