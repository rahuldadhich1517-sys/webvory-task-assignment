import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import apiRouter from './routes/index.js'
import { errorHandler } from './utils/errorHandler.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use('/api', apiRouter)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`)
})
