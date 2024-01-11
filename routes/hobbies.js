import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as hobbiesCtrl from '../controllers/hobbies.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/:profileId', checkAuth, hobbiesCtrl.index)
router.post('/:profileId/new', checkAuth, hobbiesCtrl.create)
router.update('/:hobbyId/edit', checkAuth, hobbiesCtrl.update)


export { router }