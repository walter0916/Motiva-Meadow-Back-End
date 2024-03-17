import { Event } from "../models/event"
import { Invitation } from "../models/invitation"

async function index(req, res) {
  try {
    const invitations = await Invitation.find({recipient: req.params.profileId})
    res.status(200).json(invitations)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function acceptInvitation(req, res) {
  try {
    const invitation = await Invitation.findById(req.params.invitationId)
    const event = await Event.findById(invitation.event)
    if (event.acceptedParticipants.includes(req.params.profileId)) {
      return res.status(400).json({ message: "User already accepted the invitation" })
    }
    event.acceptedParticipants.push(req.params.profileId)
    await event.save()
    await invitation.remove()
    res.status(200).json({ message: "Invitation accepted successfully" })
  } catch (error) {
    console.error("Error accepting invitation:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function declineInvitation(req, res) {
  try {
    const invitation = await Invitation.findById(req.params.invitationId)
    const event = await Event.findById(invitation.event)
    event.invitedParticipants.pull(req.params.profileId)
    await event.save()
    await invitation.remove()
    res.status(200).json({ message: "Invitation declined successfully" })
  } catch (error) {
    console.error("Error declining invitation:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export {
  index,
  acceptInvitation,
  declineInvitation
}