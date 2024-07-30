const express = require("express");
const bodyParser = require("body-parser");

const sharedData = require("./sharedData");

const app = express();
const port = process.env.PORT || 8000;

// This will be a unique identifier for each server instance
const serverId = Math.random().toString(36).substring(7);

app.use(bodyParser.json());

app.use((req, res, next) => {
	console.log(
		`Server ${serverId} handling ${req.method} request to ${req.url}`
	);
	next();
});

pp.get("/todos", (req, res) => {
	res.json(sharedData.getTodos());
});

app.post("/todos", (req, res) => {
	const newTodo = { id: Date.now(), text: req.body.text, completed: false };
	sharedData.addTodo(newTodo);
	res.status(201).json(newTodo);
});

app.listen(port, () => {
	console.log(`Server ${serverId} running on port ${port}`);
});
