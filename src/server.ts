import express from 'express'
import authRoutes from './routes/authRoutes.ts'
import userRoutes from './routes/userRoutes.ts'
import habitRoutes from './routes/habitRoutes.ts'

const app = express()

app.get('/health', (req, res) => {
    res.json({message: 'hello'}).status(200)
})

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/habit', habitRoutes)

export { app }

export default app
