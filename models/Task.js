import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true, },
    label: { type: String, default: "other" },
    rating: { type: Number },
    views: { type: Number, default: 0 },
    tags: { type: Array },
    img: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
