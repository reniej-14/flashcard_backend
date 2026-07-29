import express from 'express'
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db'

const app = express()

// Conectar a DB
connectDB()

// Cors

// Leer datos de formularios
app.use(express.json())

// Router
app.use('/', router)

export default app