import { Event } from '../models/event.js'
import { Invitation } from '../models/invitation.js'

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
    const { profileId } = req.params
    req.body.author = profileId
    const event = await Event.create(req.body)
    if (req.body.invitedParticipants && req.body.invitedParticipants.length > 0) {
      const invitations = req.body.invitedParticipants.map(async (participant) => {
        const invitation = await Invitation.create({
          sender: profileId,
          recipient: participant,
          eventId: event._id 
        })
        return invitation
      })
      await Promise.all(invitations)
    }

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