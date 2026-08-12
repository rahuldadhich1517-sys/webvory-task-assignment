import express from 'express'
import tasksRouter from './tasks.js'
import usersRouter from './users.js'
import commentsRouter from './comments.js'
import dashboardRouter from './dashboard.js'
import externalRouter from './external.js'

const router = express.Router()

router.use('/tasks', tasksRouter)
router.use('/users', usersRouter)
router.use('/', commentsRouter)
router.use('/dashboard', dashboardRouter)
router.use('/external', externalRouter)

export default router
