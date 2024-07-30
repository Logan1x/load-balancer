const sharedData = require("./sharedData");

function processTask(task) {
	console.log(`Processing task: ${task}`);
	// Do some work...
}

setInterval(() => {
	const task = sharedData.getNextTask();
	if (task) {
		processTask(task);
	}
}, 1000);
