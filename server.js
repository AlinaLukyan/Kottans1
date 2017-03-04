'use strict';

const http = require('http');
const staticServer = require('node-static');
const file = new staticServer.Server('.');
const data = require('./data.js');


http.createServer(function(request, response) {
    if (request.url === '/photos') {
        response.writeHead(200, {
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-cache'
        });

        // JSON.parse()
        // JSON.stringify()
        response.end(JSON.stringify(data.photos));

    } else {
        // returns index.html by default
        file.serve(request, response);
    }
}).listen(3000);

console.log('Server running on port 3000');