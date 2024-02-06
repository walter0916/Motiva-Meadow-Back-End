import mongoose from "mongoose"

const Schema = mongoose.Schema

const friendRequestSchema = new Schema({
  sender:{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  recipient:{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  accepted:{
    type: Boolean,
    default: false
  }
})

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema)

export { FriendRequest }