# How to scale : Load Balancer

This repo is to help code repository with the talk.

## Instruction for running

1. Install the packages using `npm install`
2. Run `server.js` by below command.

```BASH
PORT=8001 node server.js
PORT=8002 node server.js
PORT=8003 node server.js
```

This will run three server instances of the backend server 3. Run load balancer server by `node load_balance.js` 4. The load balancers is running with 3 server instances here. You can open postman and sent request to `http://localhost:8000/todos` and see the output in above servers. 5. Optional: If you want to simulate the requests, run `node simulate_req.js`. It will run 200 GET requests to `/todos` endpoint.
