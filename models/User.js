import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: false },
        password: { type: String, required: true },
        img: { type: String, default: '' },
    },
    { timestamps: true }
)

export default mongoose.model('User', UserSchema)
