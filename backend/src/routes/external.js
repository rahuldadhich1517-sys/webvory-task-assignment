import express from 'express'
import { getExternalUsers } from '../services/externalService.js'

const router = express.Router()

router.get('/users', getExternalUsers)

export default router
