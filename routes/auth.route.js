import { Router } from "express";
import { registration, login, getMe } from '../controllers/auth.controller.js'
import { checkAuth } from "../middlewares/auth.middleware.js";
import { body } from 'express-validator';

const router = new Router()

router.post(
    '/registration',
    body('email').isEmail(),
    body('username').notEmpty().isLength({ min: 2, max: 35 }).trim().escape(),
    body('password').isLength({ min: 6, max: 128 }).matches(/\d/),
    registration
)

router.post('/login', login)

router.get('/me', checkAuth, getMe)

export default router