import { Invitation } from "../models/invitation"

async function acceptInvitation(req, res) {
  try {
    const invitation = await Invitation.findById(req.params.invitationId)
    const event = await event.findById(invitation.event._id)
  } catch (error) {
    
  }
}