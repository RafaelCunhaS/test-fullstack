import cors from 'cors'
import 'express-async-errors'
import express from 'express'
import clientRouter from './routes/clientRouter'
import errorMiddleware from './middlewares/error'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/clients', clientRouter)

app.use(errorMiddleware)

export default app
