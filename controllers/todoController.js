import Todo from '../models/Todo.js';

// ✅ Get all todos for a user
export const getTodos = async (req, res) => {
  try {
    const userId = req.params.userId;
    const todos = await Todo.find({ userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

// ✅ Add a new todo
export const addTodo = async (req, res) => {
  try {
    const { task } = req.body;
    const userId = req.user; // coming from auth middleware
    const newTodo = new Todo({ task, userId, status: false }); // set status to false by default
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to add todo" });
  }
};

// ✅ Update todo status (toggle complete/incomplete)
export const updateTodo = async (req, res) => {
  const { todoId } = req.params;
  let { status } = req.body;

  try {
    // convert string to boolean if needed
    if (typeof status === "string") {
      status = status === "true";
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { status },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


// ✅ Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const deleted = await Todo.findByIdAndDelete(todoId);

    if (!deleted) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};