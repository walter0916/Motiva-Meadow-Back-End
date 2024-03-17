import mongoose from 'mongoose'

const Schema = mongoose.Schema 

const eventSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  start: {
    type: Date, 
    required: true
  },
  end: {
    type: Date, 
    required: true
  },
  allDay: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    enum: ['blue', 'green', 'yellow', 'purple', 'red', 'orange', 'pink'],
    default: 'green'
  },
  invitedParticipants: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }],
  acceptedParticipants: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
},
  { timestamps: true }
)

const Event = mongoose.model('Event', eventSchema)

export { Event }