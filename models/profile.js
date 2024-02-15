import mongoose from 'mongoose'

const Schema = mongoose.Schema

const preferencesSchema = new Schema({
  showEvents: {
    type: Boolean,
    default: false
  },
  showToDoList: {
    type: Boolean,
    default: false
  },
  showGoals: {
    type: Boolean,
    default: false
  },
  showQuotes: {
    type: Boolean,
    default: false
  },
  showHabitProgress: {
    type: Boolean,
    default: false
  },
  seeStats: {
    type: Boolean,
    default: false
  }
},
  { timestamps: true}
)

const profileSchema = new Schema({
  name: String,
  photo: String,
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }],
  preferences: [preferencesSchema] 
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
