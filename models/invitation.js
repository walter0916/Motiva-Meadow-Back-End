import mongoose from 'mongoose'

const Schema = mongoose.Schema

const invitationSchema = new Schema({
  sender:{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  recipient:{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  event:{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }
})

const Invitation = mongoose.model('Invitation', invitationSchema)

export {Invitation}