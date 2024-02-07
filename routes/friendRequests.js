import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as friendRequestsCtrl from '../controllers/friendRequests.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/:profileId', checkAuth, friendRequestsCtrl.index)
router.put('/:requestId/accept', checkAuth, friendRequestsCtrl.acceptRequest)



export { router }