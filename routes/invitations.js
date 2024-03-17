import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as invitationsCtrl from '../controllers/invitations.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.put('/:profileId/:invitationId/accept', checkAuth, invitationsCtrl.acceptInvitation)


export { router }