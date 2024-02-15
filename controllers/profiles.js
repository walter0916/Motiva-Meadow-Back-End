import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

async function index(req, res) {
  try {
    const profiles = await Profile.find({})
    res.json(profiles)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const profile = await Profile.findById(req.params.profileId)
      .populate('friends')
    res.status(200).json(profile)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findById(req.params.id)

    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function updateProfile(req, res) {
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    )
    res.status(200).json(profile)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function updatePreferences(req, res) {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.profileId,
      { preferences: req.body },
      { new: true }
    )
    res.status(200).json(updatedProfile)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}

async function updateFriends(req, res) {
  try {
    const { friends } = req.body
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.profileId,
      { friends },
      { new: true }
    )
    res.status(200).json(updatedProfile)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}

async function removeFriend(req, res) {
  try {
    const profile = await Profile.findById(req.params.profileId)
    profile.friends.pull(req.params.friendId)
    await profile.save()
    res.status(200).json(profile)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}

async function deleteProfile(req, res) {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.profileId)
    res.status(200).json(profile)
  } catch (error) {
    res.status(500).json(error)
  }
}


export { 
  index,
  show, 
  addPhoto,
  updateProfile,
  updatePreferences,
  updateFriends,
  removeFriend,
  deleteProfile
}
