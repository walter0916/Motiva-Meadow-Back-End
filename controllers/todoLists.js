import { ToDoList } from "../models/todoList.js"

async function index(res, req){
  try {
    const todoLists = await ToDoList.find({author: req.params.profileId})
      .populate('tasks')
      .sort({ createdAt: 'desc' })
    res.status(200).json(todoLists) 
  } catch (err) {
    res.status(500).json(err)
  }
}

export {
  index
}