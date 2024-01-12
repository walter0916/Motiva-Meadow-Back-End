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

export {
  index,
}