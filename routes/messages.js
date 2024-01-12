import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as messagesCtrl from '../controllers/messages.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/:profileId', checkAuth, messagesCtrl.index)
router.post('/:senderId/:recipientId/new', checkAuth, messagesCtrl.create)
router.put('/:messageId/edit', checkAuth, messagesCtrl.update)


export { router }