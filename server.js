const express = require("express");
const bodyParser = require("body-parser");
const rateLimiter = require("./rateLimiter");
const sharedData = require("./sharedData");

const app = express();
const port = process.env.PORT || 8000;

// This will be a unique identifier for each server instance
const serverId = Math.random().toString(36).substring(7);

// Apply rate limiter to all routes
app.use(rateLimiter);

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(
    `Server ${serverId} handling ${req.method} request to ${req.url}`
  );
  next();
});

app.get("/todos", (req, res) => {
  res.json(sharedData.getTodos());
});

app.post("/todos", (req, res) => {
  const newTodo = { id: Date.now(), text: req.body.text, completed: false };
  sharedData.addTodo(newTodo);
  res.status(202).json({ message: "Todo added to queue", todo: newTodo });
});

app.patch("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  sharedData.updateTodo(id, req.body);
  res.status(202).json({ message: "Todo update added to queue" });
});

app.get("/queue-status", (req, res) => {
  res.json({
    queueLength: sharedData.getQueueLength(),
    activeWrites: sharedData.getActiveWrites(),
  });
});

app.listen(port, () => {
  console.log(`Server ${serverId} running on port ${port}`);
});
