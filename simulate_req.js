const fetch = require("node-fetch");

const NUM_REQUESTS = 200; // Number of requests to send
const DELAY_MS = 1; // Delay between requests in milliseconds

async function sendRequest(id) {
	try {
		const response = await fetch("http://localhost:8000/todos");
		console.log(`Request ${id}: Status ${response.status}`);
		// Uncomment the next line if you want to see the response body
		// const body = await response.text();
		// console.log(`Request ${id}: Body ${body}`);
	} catch (error) {
		console.error(`Request ${id}: Error ${error.message}`);
	}
}

async function simulateRequests() {
	console.log(
		`Sending ${NUM_REQUESTS} requests to http://localhost:8000/todos`
	);

	for (let i = 0; i < NUM_REQUESTS; i++) {
		await sendRequest(i + 1);

		// Add a small delay between requests
		await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
	}

	console.log("All requests sent!");
}

simulateRequests();
