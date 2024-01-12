import { Event } from '../models/events.js'

async function index(req, res) {
  try {
    const events = await Event.find({ author: req.params.profileId })
      .populate('author')
      .sort({ createdAt: 'desc' })
    res.status(200).json(events)
  } catch (error) {
    res.status(500).json(error)    
  }
}

async function create(req, res) {
  try {
    req.body.author = req.params.profileId
    const event = await Event.create(req.body)
    res.status(200).json(event)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function updateEvent(req, res) {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.eventId,
      req.body,
      { new: true }
    )
    res.status(200).json(event)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteEvent(req, res) {
  try {
    const event = await Event.findByIdAndDelete(req.params.eventId)
    res.status(200).json(event)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  index,
  create,
  updateEvent as update,
  deleteEvent as delete,
}