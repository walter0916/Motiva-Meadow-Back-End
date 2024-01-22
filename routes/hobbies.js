import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as hobbiesCtrl from '../controllers/habits.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/:profileId', checkAuth, hobbiesCtrl.index)
router.post('/:profileId/new', checkAuth, hobbiesCtrl.create)
router.put('/:habitId/edit', checkAuth, hobbiesCtrl.update)
router.delete('/:habitId/delete', checkAuth, hobbiesCtrl.delete)
router.put('/:habitId/updateHabitProgress', checkAuth, hobbiesCtrl.updateHabitProgress)


export { router }