import { Router } from "express";
import { createTask, getAll, getById, removeTask, updateTask } from '../controllers/task.controller.js'
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = new Router()

router.post('/create', createTask)
router.get('/', getAll)
router.get('/:id', getById)
router.delete('/:id', checkAuth, removeTask)
router.put('/:id', checkAuth, updateTask)

export default router