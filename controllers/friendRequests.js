import { FriendRequest } from "../models/friendRequest.js"
import { Profile } from "../models/profile.js"

async function index(req, res) {
  try {
    const requests = await FriendRequest.find({
      $or: [
        { sender: req.params.profileId },
        { recipient: req.params.profileId }
      ]
    })
      .populate('sender')
      .populate('recipient')
    res.status(200).json(requests)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function create(req, res) {
  try {
    const request = await FriendRequest.create(req.body)
    res.status(200).json(request)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function acceptRequest(req, res) {
  try {
    const request = await FriendRequest.findById(req.params.requestId)
    request.accepted = true
    await request.save()
    const senderProfile = await Profile.findById(request.sender)
    const recipientProfile = await Profile.findById(request.recipient)
    const senderIsFriend = senderProfile.friends.includes(request.recipient)
    const recipientIsFriend = recipientProfile.friends.includes(request.sender)
    if (!senderIsFriend) {
      senderProfile.friends.push(request.recipient)
    }
    if (!recipientIsFriend) {
      recipientProfile.friends.push(request.sender)
    }
    await Promise.all([senderProfile.save(), recipientProfile.save()])
    await FriendRequest.findByIdAndDelete(req.params.requestId)
    res.status(200).json(request)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteRequest(req, res) {
  try {
    const request = await FriendRequest.findByIdAndDelete(req.params.requestId)
    res.status(200).json(request)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  index,
  acceptRequest,
  deleteRequest as delete,
  create
}