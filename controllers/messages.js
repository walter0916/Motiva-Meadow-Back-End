import { Message } from '../models/message.js'

async function index(req, res) {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.params.profileId },
        { recipient: req.params.profileId }
      ]
    })
      .populate('sender')
      .populate('recipient')
      .sort({ createdAt: 'desc' })
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function create(req, res) {
  try {
    req.body.sender = req.params.senderId
    req.body.recipient = req.params.recipientId
    const message = await Message.create(req.body)
    res.status(200).json(message)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  index,
  create,
}