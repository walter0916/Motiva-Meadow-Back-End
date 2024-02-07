import { FriendRequest } from "../models/friendRequest.js"

async function index(req, res) {
  try {
    const requests = await FriendRequest.find({recipient: req.params.profileId})
      .populate('sender')
      .populate('recipient')
    res.status(200).json(requests)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  index,
}