import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../services/token.service.js'
import { ApiError } from '../exceptions/api.error.js'

//Registration
export const registration = async (req, res) => {
    try {
        const { email, password, name } = req.body
        const isUsed = await User.findOne({ email })

        if (isUsed) {
            return res.status(409).json({
                message: 'This email is already used'
            })
        }

        const salt = bcrypt.genSaltSync(10) //difficult
        const hash = bcrypt.hashSync(password, salt)


        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            const user = new User({ email, password: hash, name, img: fileName })

            const token = generateToken(user._id)

            try {

                await user.save()

            } catch (error) {
                console.log(error);
            }
            return res.status(201).json({ user, token, message: 'registration success' })
        }
        const user = new User({ email, password: hash, name, img: '' })
        const token = generateToken(user._id)

        await user.save()
        return res.status(201).json({
            user,
            token,
            message: 'registration success'
        })

    } catch (error) {
        return res.status(404).json({ message: 'registration error' })
    }
}
//email
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(208).json({ message: 'user does not exist' })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(403).json({ message: 'password is incorrect' })
        }

        const token = generateToken(user._id)


        res.json({
            token,
            user,
            message: 'You are successfully logged in'
        })

    } catch (error) {
        return res.status(404).json({ message: 'authorization error' })
    }
}
//Get me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.status(208).json({ message: 'user does not exist' })
        }

        const token = generateToken(user._id)

        res.status(200).json({
            user,
            token,
            message: 'You are back'
        })
    } catch (error) {
        return res.status(404).json({ message: 'something went wrong' })
    }
}
