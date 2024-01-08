import mongoose from 'mongoose'

const Schema = mongoose.Schema 

const eventSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  date: {
    type: Date, 
    required: true
  },
  color: {
    type: String,
    enum: ['blue', 'green', 'yellow', 'purple', 'red', 'orange', 'pink'],
    default: 'white'
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
})

const Event = mongoose.model('Event', eventSchema)

export { Event }