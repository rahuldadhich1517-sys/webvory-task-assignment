import express from 'express'
import {
  getCommentsForTask,
  createComment,
  deleteComment,
} from '../services/commentService.js'

const router = express.Router()

router.get('/tasks/:id/comments', getCommentsForTask)
router.post('/tasks/:id/comments', createComment)
router.delete('/comments/:id', deleteComment)

export default router
