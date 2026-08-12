import express from 'express'
import { getDashboard } from '../services/dashboardService.js'

const router = express.Router()

router.get('/', getDashboard)

export default router
