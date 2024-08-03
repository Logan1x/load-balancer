let todos = [];

module.exports = {
  getTodos: () => todos,
  addTodo: (todo) => todos.push(todo),
  updateTodo: (id, updates) => {
    const index = todos.findIndex((t) => t.id === id);
    if (index !== -1) {
      todos[index] = { ...todos[index], ...updates };
    }
  },
};
