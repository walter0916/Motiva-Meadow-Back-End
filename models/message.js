import mongoose from 'mongoose'

const Schema = mongoose.Schema 

const messageSchema = new Schema ({
  content: {
    type: String,
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  }
},
  {timestamps: true}
)

const Message = mongoose.model('Message', messageSchema)

export { Message } 