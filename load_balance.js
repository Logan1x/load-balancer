const http = require("http");

const servers = [
	"http://localhost:8001",
	"http://localhost:8002",
	"http://localhost:8003",
];
let currentServer = 0;

const loadBalancer = http.createServer((req, res) => {
	const server = servers[currentServer];
	currentServer = (currentServer + 1) % servers.length;

	console.log(`Load Balancer: Forwarding request to ${server}`);

	// Add a custom header to track which server handled the request
	req.headers["x-forwarded-server"] = server;

	const options = {
		hostname: new URL(server).hostname,
		port: new URL(server).port,
		path: req.url,
		method: req.method,
		headers: req.headers,
	};

	const proxyReq = http.request(options, (proxyRes) => {
		res.writeHead(proxyRes.statusCode, proxyRes.headers);
		proxyRes.pipe(res);
	});

	req.pipe(proxyReq);
});

loadBalancer.listen(8000, () =>
	console.log("Load balancer running on port 8000")
);
