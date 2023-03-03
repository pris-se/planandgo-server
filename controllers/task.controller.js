import Task from '../models/Task.js'
import User from '../models/User.js'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'

//Create task
export const createTask = async (req, res) => {
    try {
        const {title, description, duration} = req.body

        if(req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            const newTaskWithImage = new Task({
                title,
                description,
                duration,
                img: fileName
            })

            await newTaskWithImage.save()
            return res.status(201).json(newTaskWithImage)
        }

        const newTaskWithoutImage = new Task({
            title,
            description,
            duration,
            img: ''
        })
        await newTaskWithoutImage.save()
        return res.status(201).json(newTaskWithImage)

    } catch (error) {
        res.status(404).json({message: 'something went wrong'})
    }
}
export const getAll = async (req, res) => {
    try {
        const tasks = await Task.find()
        if(!tasks) {
            return res.status(208).json({message: 'there are no tasks'})
        }
            res.json({
                tasks,
                message: 'Success'
            })
    } catch (error) {
        return res.status(404).json({message: 'something went wrong'})
    }
}
export const getById = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, {
            $inc: {views: 1}
        })
        if(!task) {
            return res.status(208).json({message: 'there are no tasks'})
        }
            res.json({
                task,
                message: 'Success'
            })
    } catch (error) {
        return res.status(404).json({message: 'something went wrong'})
    }
}
export const removeTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) {
            return res.status(208).json({message: 'there are no tasks'})
        }
            res.json({
                task,
                message: 'Success'
            })
    } catch (error) {
        return res.status(404).json({message: 'something went wrong'})
    }
}
export const updateTask = async (req, res) => {
    try {
        const { title, duration, description, id } = req.body
        const task = await Task.findById(id)

        if(req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            task.img = fileName || ''
        }

        task.title = title
        task.duration = duration
        task.description = description

        try {
            await task.save()
        } catch (error) {
            console.log(error);
        }

            res.json({
                task,
                message: 'Success'
            })
    } catch (error) {
        return res.status(404).json({message: 'something went wrong'})
    }
}
