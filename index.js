import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload';
import authRoute from './routes/auth.route.js'
import tasksRoute from './routes/task.route.js'
import { errorMiddleware } from './middlewares/error.middleware.js';
import serverless from 'serverless-http';

const app = express()
const router = express.Router()
dotenv.config()

//Constansts
const PORT = process.env.PORT || 3001
const DB_URL = process.env.DB_URL

//Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use("/uploads", express.static('uploads'))


//Routes
//http://localhost:3002/
app.use('/api/auth', authRoute)
app.use('/api/tasks', tasksRoute)

router.get('/', (req, res) => {
    res.json({
        'author': 'Sergey P', 
    })
})

// app.use("/.netlify/functions/api", router)

async function start() {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        app.listen(PORT, () => console.log(`Server Port ${PORT}`))
    } catch (error) {
        console.log(console.log(error));
    }
}

start()

export const handler = serverless(app)