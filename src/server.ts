import express from 'express'
import authRoutes from './routes/authRoutes.ts'
import userRoutes from './routes/userRoutes.ts'
import habitRoutes from './routes/habitRoutes.ts'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { isTest } from '../env.ts'

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev', {
    skip: () => isTest(),
}))


app.get('/health', (req, res) => {
    res.status(200).json({message: 'hello'})
})

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/habit', habitRoutes)

export { app }

export default app
