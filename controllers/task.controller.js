import Task from '../models/Task.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

export const createTask = async (req, res) => {
    try {
        const { title, description, duration } = req.body

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            const task = new Task({
                title,
                description,
                duration,
                img: fileName
            })

            await task.save()
            return res.status(201).json({ task, message: 'registration success' })
        }

        const task = new Task({
            title,
            description,
            duration,
            img: ''
        })
        await task.save()
        return res.status(201).json({ task, message: 'registration success' })

    } catch (error) {
        return res.status(404).json({ message: 'something went wrong' })
    }
}
export const getAll = async (req, res) => {
    try {
        const tasks = await Task.find()
        if (!tasks) {
            return res.status(208).json({ message: 'there are no tasks' })
        }
        return res.json({
            tasks,
            message: 'Success'
        })
    } catch (error) {
        return res.status(404).json({ message: 'something went wrong' })
    }
}
export const getById = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        })
        if (!task) {
            return res.status(208).json({ message: 'there are no tasks' })
        }
        return res.json({
            task,
            message: 'Success'
        })
    } catch (error) {
        return res.status(404).json({ message: 'something went wrong' })
    }
}
export const removeTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(208).json({ message: 'there are no tasks' })
        }
        res.json({
            task,
            message: 'removed'
        })
    } catch (error) {
        return res.status(404).json({ message: 'something went wrong' })
    }
}
export const updateTask = async (req, res) => {
    try {
        const { title, duration, description, label, tags, id } = req.body

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            const img = fileName || ''

            try {
                const task = await Task.findByIdAndUpdate(id, {
                    title,
                    duration,
                    description,
                    label,
                    img,
                    tags: tags
                    // $push: { tags: tags.trim().split('#') }
                })
                return res.json({
                    task,
                    message: 'Success'
                })
            } catch (error) {
                console.log(error);
            }

        }

        try {
            const task = await Task.findByIdAndUpdate(id, {
                title,
                duration,
                description,
                label,
                tags: tags
                // $push: { tags: tags.trim().split('#') }
            })
            return res.json({
                task,
                message: 'Success'
            })
        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        return res.status(404).json({ message: 'something went wrong' })
    }
}
