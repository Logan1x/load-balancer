const fetch = require("node-fetch");

const NUM_GET_REQUESTS = 100;
const NUM_POST_REQUESTS = 50;
const NUM_PATCH_REQUESTS = 50;
const DELAY_MS = 0; // Delay between requests in milliseconds

async function sendGetRequest(id) {
  try {
    const response = await fetch("http://localhost:8000/todos");
    console.log(`GET Request ${id}: Status ${response.status}`);
  } catch (error) {
    console.error(`GET Request ${id}: Error ${error.message}`);
  }
}

async function sendPostRequest(id) {
  try {
    const response = await fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: `Todo item ${id}` }),
    });
    console.log(`POST Request ${id}: Status ${response.status}`);
  } catch (error) {
    console.error(`POST Request ${id}: Error ${error.message}`);
  }
}

async function sendPatchRequest(id) {
  try {
    const response = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });
    console.log(`PATCH Request ${id}: Status ${response.status}`);
  } catch (error) {
    console.error(`PATCH Request ${id}: Error ${error.message}`);
  }
}

async function checkQueueStatus() {
  try {
    const response = await fetch("http://localhost:8000/queue-status");
    const status = await response.json();
    console.log(
      `Queue Status: Length ${status.queueLength}, Active Writes ${status.activeWrites}`
    );
  } catch (error) {
    console.error(`Queue Status Check Error: ${error.message}`);
  }
}

async function simulateRequests() {
  console.log(`Starting simulation...`);

  // Simulate GET requests
  for (let i = 0; i < NUM_GET_REQUESTS; i++) {
    await sendGetRequest(i + 1);
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  }

  // Simulate POST requests
  for (let i = 0; i < NUM_POST_REQUESTS; i++) {
    await sendPostRequest(i + 1);
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  }

  // Simulate PATCH requests
  for (let i = 0; i < NUM_PATCH_REQUESTS; i++) {
    await sendPatchRequest(i + 1);
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  }

  console.log("All requests sent!");

  // Check queue status every second for 10 seconds
  for (let i = 0; i < 10; i++) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    await checkQueueStatus();
  }
}

simulateRequests();
