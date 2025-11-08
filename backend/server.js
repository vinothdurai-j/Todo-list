import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: ["https://todo-list-frontend-bvh5.onrender.com"], // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

let todos = []; // temporary in-memory storage

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const todo = req.body;
  todos.push(todo);
  res.status(201).json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id !== id);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
