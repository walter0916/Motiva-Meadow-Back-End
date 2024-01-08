import mongoose from 'mongoose'

const Schema = mongoose.Schema

const hobbySchema = new Schema({
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
  }
},
  { timestamps: true }
)

const Hobby = mongoose.model('Hobby', hobbySchema)

export { Hobby }