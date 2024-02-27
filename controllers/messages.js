import { Message } from '../models/message.js'

async function index(req, res) {
  try {
    const messages = await Message.find({ recipient: req.params.profileId })
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

async function updateMessage(req, res) {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.messageId, 
      req.body,
      { new: true }
    )
    res.status(200).json(message)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteMessage(req, res) {
  try {
    const message = await Message.findByIdAndDelete(req.params.messageId)
    res.status(200).json(message)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  index,
  create,
  updateMessage as update,
  deleteMessage as delete
}