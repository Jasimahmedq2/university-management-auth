import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import { errorLogger, logger } from './shared/logger'

const port: number = 5000 || config.port

const connectDB = async () => {
  try {
    await mongoose.connect(config.db_connect as string)
    logger.info('db connected')
    app.listen(port, () => {
      console.log('successfully connected')
    })
  } catch (error) {
    errorLogger.error('db disconnected:', error)
  }
}

connectDB()
