import { Router } from "express";
import { registration, login, getMe } from '../controllers/auth.controller.js'
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = new Router()

//Registration
//http://localhost:3002/api/auth/registration
router.post('/registration', registration)
//Login
//http://localhost:3002/api/auth/login
router.post('/login', login)

//Get me
//http://localhost:3002/api/auth/me
router.get('/me',checkAuth, getMe)

export default router