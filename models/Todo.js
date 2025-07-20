import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: Boolean, default: false }, // ✅ change to Boolean
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;