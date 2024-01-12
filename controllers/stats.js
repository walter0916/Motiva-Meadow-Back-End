import { Stat } from '../models/stat.js'

async function index(req, res) {
  try {
    const stats = await Stat.find({profile: req.params.profileId})
      .populate('profile')
    res.Status(200).json(stats)
  } catch (error) {
    res.stats(500).json(error)
  }
}

export {
  index
}