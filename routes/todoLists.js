import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as todosCtrl from '../controllers/todoLists.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/:profileId', checkAuth, todosCtrl.index)
router.post('/:profileId/new', checkAuth, todosCtrl.create)
router.post('/:listId/tasks', checkAuth, todosCtrl.addTask)
router.put('/:todoId/edit', checkAuth, todosCtrl.update)
router.delete('/:todoId/delete', checkAuth, todosCtrl.delete)

export { router }