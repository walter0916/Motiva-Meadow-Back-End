import mongoose from 'mongoose'

const Schema = mongoose.Schema

const goalSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['work', 'personal', 'interpersonal'],
    default: 'personal'
  },
  dueDate: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['casual', 'kind of important', 'super important' ],
    default: 'casual'
  },
  completed: {
    type: Boolean,
    default: false
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
},
  { timestamps: true }
)

const Goal = mongoose.model('Goal', goalSchema)

export { Goal }