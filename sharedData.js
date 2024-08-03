let todos = [];
let writeQueue = [];
const MAX_CONCURRENT_WRITES = 2;
let activeWrites = 0;

function processWriteQueue() {
  while (writeQueue.length > 0 && activeWrites < MAX_CONCURRENT_WRITES) {
    const task = writeQueue.shift();
    activeWrites++;

    performWrite(task)
      .then(() => {
        activeWrites--;
        processWriteQueue();
      })
      .catch((error) => {
        console.error("Write error:", error);
        activeWrites--;
        processWriteQueue();
      });
  }
}

function performWrite(task) {
  return new Promise((resolve) => {
    console.log("Performing write:", task);
    todos.push(task.todo);
    // Simulate a small delay for database write
    setTimeout(resolve, 1000);
  });
}

module.exports = {
  getTodos: () => todos,
  addTodo: (todo) => {
    writeQueue.push({ type: "addTodo", todo });
    processWriteQueue();
  },
  updateTodo: (id, updates) => {
    writeQueue.push({ type: "updateTodo", id, updates });
    processWriteQueue();
  },
  getQueueLength: () => writeQueue.length,
  getActiveWrites: () => activeWrites,
};
