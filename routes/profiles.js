import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.get('/:profileId', checkAuth, profilesCtrl.show)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)
router.put('/:profileId/edit', checkAuth, profilesCtrl.updateProfile)
router.put('/:profileId/edit-preferences', checkAuth, profilesCtrl.updatePreferences)
router.put('/:profileId/edit-friends', checkAuth, profilesCtrl.updateFriends)
router.patch('/:profileId/:friendId/remove', checkAuth, profilesCtrl.removeFriend)

export { router }
