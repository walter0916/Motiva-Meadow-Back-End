import mongoose from 'mongoose'

const Schema = mongoose.Schema

const habitSchema = new Schema({
  title: {
    type: String, 
    required: true
  },
  type: {
    type: String,
    enum: ['work', 'personal', 'interpersonal'],
    default: 'work',
  },
  weeklyGoal: {
    type: Number,
    required: true
  },
  currentNumber: {
    type: Number,
    default: 0
  },
  completed:{
    type: Boolean,
    default: false
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  currentStreak: {
    type: Number,
    default: 0,
  },
  LongestStreak: {
    type: Number,
    default: 0,
  },
  LastCompleted: {
    type: Date
  },
  completedDays: [{
    type: String,
    enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  }],
},
  { timestamps: true }
)

const Habit = mongoose.model('Hobby', habitSchema)

export { Habit }