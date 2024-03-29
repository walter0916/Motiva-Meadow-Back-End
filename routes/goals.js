import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as goalsCtrl from '../controllers/goals.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/:profileId', checkAuth, goalsCtrl.index)
router.post('/:profileId/new', checkAuth, goalsCtrl.create)
router.put('/:goalId/edit', checkAuth, goalsCtrl.update)
router.delete('/:goalId/delete', checkAuth, goalsCtrl.delete)
router.put('/:goalId/updateCompletion', checkAuth, goalsCtrl.updateCompletion)

export { router }