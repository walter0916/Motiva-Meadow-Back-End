import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as habitsCtrl from '../controllers/habits.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/:profileId', checkAuth, habitsCtrl.index)
router.post('/:profileId/new', checkAuth, habitsCtrl.create)
router.put('/:habitId/edit', checkAuth, habitsCtrl.update)
router.delete('/:habitId/delete', checkAuth, habitsCtrl.delete)
router.put('/:habitId/updateHabitProgress', checkAuth, habitsCtrl.updateHabitProgress)


export { router }