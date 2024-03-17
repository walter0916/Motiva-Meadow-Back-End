import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as invitationsCtrl from '../controllers/invitations.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/:profileId', checkAuth, invitationsCtrl.index)
router.put('/:profileId/:invitationId/accept', checkAuth, invitationsCtrl.acceptInvitation)
router.put('/:profileId/:invitationId/decline', checkAuth, invitationsCtrl.declineInvitation)


export { router }