const cron = require('node-cron')
import { Hobby } from '../models/hobby.js'

async function index (req, res){
  try {
    const hobbies = await Hobby.find({author: req.params.profileId})
      .populate('author')
      .sort({ createdAt: 'desc' })
      res.status(200).json(hobbies)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function create (req, res) {
  try {
    req.body.author = req.params.profileId
    const hobby = await Hobby.create(req.body)
    res.status(200).json(hobby)
  } catch (error) {
    req.status(500).json(error)
  }
}

async function updateHobby (req, res) {
  try {
    const hobby = await Hobby.findByIdAndUpdate(
      req.params.hobbyId,
      req.body,
      { new: true }
    )
    res.status(200).json(hobby)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteHobby (req, res) {
  try {
    const hobby = await Hobby.findByIdAndDelete(req.params.hobbyId)
    res.status(200).json(hobby)
  } catch (error) {
    res.status(500).json(error)
  }
}


async function completeHobby(req, res) {
  try {
    const { completedThisWeek } = req.body
    const updatedHobby = await Hobby.findByIdAndUpdate(
      req.params.hobbyId,
      { 
        currentStreak: completedThisWeek ? req.body.currentStreak + 1 : 0,
        LongestStreak: Math.max(req.body.LongestStreak, req.body.currentStreak + 1),
        LastCompleted: completedThisWeek ? new Date() : req.body.LastCompleted,
      },
      { new: true }
    )
    res.status(200).json(updatedHobby)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function updateHobbyProgress(req, res) {
  try {
    const hobbyId = req.params.hobbyId
    const hobby = await Hobby.findById(hobbyId)
    const currentDay = req.body.currentDay
    if (!hobby.completedDays.includes(currentDay)) {
      hobby.completedDays.push(currentDay)
      hobby.currentNumber += 1
      if (hobby.currentNumber >= hobby.weeklyGoal) {
        hobby.completed = true
      } else {
        hobby.completed = false
      }
      await hobby.save()
      res.status(200).json(hobby)
    } else {
      res.status(200).json(hobby)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

cron.schedule('0 0 * * 0', async () => {
  try {
    const allHobbies = await Hobby.find()
    await Promise.all(allHobbies.map(async (hobby) => {
      const today = new Date()
      const endOfWeek = new Date(today)
      endOfWeek.setDate(today.getDate() + (6 - today.getDay()))
      hobby.completedDays = []
      hobby.currentNumber = 0
      if (hobby.completed) {
        hobby.currentStreak += 1
        if (hobby.currentStreak > hobby.LongestStreak) {
          hobby.LongestStreak = hobby.currentStreak
        }
        hobby.LastCompleted = endOfWeek
      } else {
        hobby.currentStreak = 0
      }
      hobby.completed = false
      await hobby.save()
    }))
    console.log('Weekly hobby reset completed.')
  } catch (error) {
    console.error('Error during weekly hobby reset:', error)
  }
})

export {
  index,
  updateHobby as update,
  create,
  deleteHobby as delete,
  completeHobby
}