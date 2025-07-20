import express from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo
} from "../controllers/todoController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:userId", auth, getTodos);
router.post("/", auth, addTodo);
router.patch("/:todoId", auth, updateTodo);
router.delete("/:todoId", auth, deleteTodo);

export default router;