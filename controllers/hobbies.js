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

export {
  index
}