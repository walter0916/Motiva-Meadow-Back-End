import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as hobbiesCtrl from '../controllers/hobbies.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/:profileId', checkAuth, hobbiesCtrl.index)
router.post('/:profileId/new', checkAuth, hobbiesCtrl.create)
router.put('/:hobbyId/edit', checkAuth, hobbiesCtrl.update)
router.delete('/:hobbyId/delete', checkAuth, hobbiesCtrl.delete)
router.put('/:hobbyId/updateCompletion', checkAuth, hobbiesCtrl.completeHobby)
router.put('/:hobbyId/updateHobbyProgress', checkAuth, hobbiesCtrl.updateHobbyProgress)


export { router }