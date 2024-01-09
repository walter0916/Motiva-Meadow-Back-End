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

export{
  index,
}