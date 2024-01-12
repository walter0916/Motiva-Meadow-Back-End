import { Stat } from '../models/stat.js'

async function index(req, res) {
  try {
    const stats = await Stat.find({profile: req.params.profileId})
      .populate('profile')
    res.status(200).json(stats)
  } catch (error) {
    res.stats(500).json(error)
  }
}

async function create(req, res) {
  try {
    req.body.profile = req.params.profileId
    const stat = await Stat.create(req.body)
    res.status(200).json(stat)
  } catch (error) {
    res.stats(500).json(error)
  }
}

async function updateStat(req, res) {
  try {
    const stat = await Stat.findByIdAndUpdate(
      req.params.statId, 
      req.body,
      { new: true }
    )
    res.status(200).json(stat)
  } catch (error) {
    res.stats(500).json(error)
  }
}

export {
  index,
  create,
  updateStat as update,
}