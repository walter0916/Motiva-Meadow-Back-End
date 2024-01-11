import { Hobby } from '../models/hobby.js'

async function index (req, res){
  try {
    const hobbies = await Hobby.find({author: req.params.profileId})
      .populate('author')
      .sort({ createdAt: 'desc' })
      res.status(200).json(hobbies)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function create (req, res) {
  try {
    req.body.author = req.params.profileId
    const hobby = await Hobby.create(req.body)
    res.status(200).json(hobby)
  } catch (error) {
    req.status(500).json(error)
  }
}

async function updateHobby (req, res) {
  try {
    const hobby = await Hobby.findByIdAndUpdate(
      req.params.hobbyId,
      req.body,
      { new: true }
    )
    res.status(200).json(hobby)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  index,
  updateHobby as update,
  create
}