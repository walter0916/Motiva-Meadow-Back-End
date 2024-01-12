import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as statsCtrl from '../controllers/stats.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/:profileId', checkAuth, statsCtrl.index)
router.post('/:profileId/new', checkAuth, statsCtrl.create)
router.put('/:statId/edit', checkAuth, statsCtrl.update)

export { router }