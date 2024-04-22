import { CronJob } from 'cron'
import { Habit } from '../models/habit.js'
import { Stat } from '../models/stat.js'


async function index (req, res){
  try {
    const habits = await Habit.find({author: req.params.profileId})
      .populate('author')
      .sort({ createdAt: 'asc' })
      res.status(200).json(habits)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function create (req, res) {
  try {
    req.body.author = req.params.profileId
    const habit = await Habit.create(req.body)
    res.status(200).json(habit)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function updateHabit (req, res) {
  try {
    const habit = await Habit.findByIdAndUpdate(
      req.params.habitId,
      req.body,
      { new: true }
    )
    res.status(200).json(habit)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function deleteHabit (req, res) {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.habitId)
    res.status(200).json(habit)
  } catch (error) {
    res.status(500).json(error)
  }
}


async function updateHabitProgress(req, res) {
  try {
    const habitId = req.params.habitId
    const habit = await Habit.findById(habitId)
    const currentDay = req.body.currentDay
    const isChecked = req.body.isChecked

    if (isChecked) {
      if (!habit.completedDays.includes(currentDay)) {
        habit.completedDays.push(currentDay)
        habit.currentNumber += 1
      }
    } else {
      const indexToRemove = habit.completedDays.indexOf(currentDay)
      habit.completedDays.splice(indexToRemove, 1)
      habit.currentNumber -= 1
      }
    habit.completed = habit.currentNumber >= habit.weeklyGoal
    await habit.save()
    res.status(200).json(habit)
  } catch (error) {
    res.status(500).json(error)
  }
}

const weeklyResetJob = new CronJob('00 00 00 * * sun', async () => {
  try {
    const allHabits = await Habit.find()
    allHabits.forEach(async (habit) => {
      const today = new Date()
      const endOfWeek = new Date(today)
      endOfWeek.setDate(today.getDate() + (7 - today.getDay()))
      habit.completedDays = []
      habit.currentNumber = 0
      if (habit.completed) {
        habit.currentStreak += 1
        if (habit.currentStreak > habit.LongestStreak) {
          habit.LongestStreak = habit.currentStreak
        }
        habit.LastCompleted = today
      } else {
        habit.currentStreak = 0
      }
      habit.completed = false
      await habit.save()

      const authorId = habit.author
      const stat = await Stat.findOne({ profile: authorId })
      if (stat) {
        stat.habitsStreak = habit.currentStreak
        await stat.save()
      }
    })
    console.log('Weekly habit reset completed.')
  } catch (error) {
    console.error('Error during weekly habit reset:', error)
  }
})

weeklyResetJob.start()

export {
  index,
  updateHabit as update,
  create,
  deleteHabit as delete,
  updateHabitProgress
}