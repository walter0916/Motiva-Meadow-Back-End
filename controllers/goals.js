import { Goal } from '../models/goal.js'

async function index(req, res){
  try {
    const goals = await Goal.find({author: req.params.profileId})
      .populate('author')
      .sort({ createdAt: 'desc' })
      res.status(200).json(goals)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function create(req, res){
  try {
    req.body.author = req.params.profileId
    const goal = await Goal.create(req.body)
    res.status(200).json(goal)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function update(req, res){
  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.goalId,
      req.body,
      { new: true }
    )
    res.status(200).json(goal)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteGoal(req, res){
  try {
    const goal = await Goal.findByIdAndDelete(req.params.goalId)
    res.status(200).json(goal)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function updateCompletion(req, res) {
  try {
    const { completed } = req.body
    const goal = await Goal.findByIdAndUpdate(
      req.params.goalId,
      { completed },
      { new: true }
    )
    res.status(200).json(goal)
  } catch (error) {
    res.status(500).json(error)
  }
}

export{
  index,
  update,
  create,
  deleteGoal as delete,
  updateCompletion 
}