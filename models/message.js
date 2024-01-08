import mongoose from 'mongoose'

const Schema = mongoose.Schema 

const messageSchema = new Schema ({
  content: {
    type: String,
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
},
  {timestamps: true}
)

const Message = mongoose.model('Message', messageSchema)

export { Message } 