import mongoose from 'mongoose'

const Schema = mongoose.Schema

const statSchema = new Schema({
  goalsCompleted: {
    type: Number,
    default: 0
  },
  hobbiesStreak: {
    type: Number,
    default: 0
  },
  toDoListStreak: {
    type: Number,
    default: 0
  },
  toDoListCompleted: {
    type: Number,
    default: 0
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
},
  {timestamps: true}
)

const Stat = mongoose.model('Stat', statSchema)

export { Stat }