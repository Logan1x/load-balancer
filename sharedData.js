let todos = [];
let taskQueue = [];

module.exports = {
	getTodos: () => todos,
	addTodo: (todo) => todos.push(todo),
	updateTodo: (id, updates) => {
		const index = todos.findIndex((t) => t.id === id);
		if (index !== -1) {
			todos[index] = { ...todos[index], ...updates };
		}
	},
	addTask: (task) => taskQueue.push(task),
	getNextTask: () => taskQueue.shift(),
};
