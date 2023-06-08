import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import route from '../src/app/routes/index'
import globalMiddleware from './app/middleware/globalMiddleware'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use('api/v1/', route)

app.get('/', (req: Request, res: Response) => {
  res.json('db running perfectly')
})

app.use(globalMiddleware)

export default app
