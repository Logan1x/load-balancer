const http = require("http");
const { URL } = require("url");

// List of backend servers
const servers = [
  "http://localhost:8001",
  "http://localhost:8002",
  "http://localhost:8003",
];
let currentServer = 0;

// Function to forward request to the appropriate server
function forwardRequest(req, res) {
  // Get the current server URL
  const serverUrl = servers[currentServer];

  // Increment the server index for next request
  currentServer = (currentServer + 1) % servers.length;

  // Log the server handling the request
  console.log(`Load Balancer: Forwarding request to ${serverUrl}`);

  // Parse the server URL
  const { hostname, port } = new URL(serverUrl);

  // Options for the request forwarded to the server
  const options = {
    hostname: hostname,
    port: port,
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      "x-forwarded-server": serverUrl, // Custom header to track which server handled the request
    },
  };

  // Forward the request to the selected server
  const proxyReq = http.request(options, (proxyRes) => {
    // Forward the response from the server to the client
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  // Forward the request body data to the server
  req.pipe(proxyReq);
}

// Create the load balancer server
const loadBalancer = http.createServer(forwardRequest);

// Start the load balancer server
loadBalancer.listen(8000, () => {
  console.log("Load balancer running on port 8000");
});
