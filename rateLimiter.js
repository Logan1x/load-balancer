// rateLimiter.js

const WINDOW_SIZE_IN_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 40;

// Store IP addresses and their request timestamps
const ipRequests = {};

function cleanupOldRequests(ip) {
  const now = Date.now();
  const windowStart = now - WINDOW_SIZE_IN_MS;
  ipRequests[ip] = ipRequests[ip].filter((time) => time > windowStart);
}

function rateLimiter(req, res, next) {
  const ip = req.ip;

  // Initialize array for this IP if it doesn't exist
  if (!ipRequests[ip]) {
    ipRequests[ip] = [];
  }

  // Clean up old requests
  cleanupOldRequests(ip);

  // Check if rate limit is exceeded
  if (ipRequests[ip].length >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      error: "Too many requests, please try again later.",
    });
  }

  // Add current request timestamp
  ipRequests[ip].push(Date.now());

  next();
}

module.exports = rateLimiter;
