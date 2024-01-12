import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as eventsCtrl from '../controllers/events.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/:profileId', checkAuth, eventsCtrl.index)
router.post('/:profileId/new', checkAuth, eventsCtrl.create)


export { router }