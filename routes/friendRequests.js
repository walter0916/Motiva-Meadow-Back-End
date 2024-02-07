import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as friendRequestsCtrl from '../controllers/friendRequests.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/:profileId', checkAuth, friendRequestsCtrl.index)
router.post('/new', checkAuth, friendRequestsCtrl.create)
router.put('/:requestId/accept', checkAuth, friendRequestsCtrl.acceptRequest)
router.delete('/:requestId/delete', checkAuth, friendRequestsCtrl.delete)



export { router }