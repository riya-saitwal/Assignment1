const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Function to serve static files
function serveStaticFile(res, filePath, contentType, responseCode = 200) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

// Create the server
const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Serve static resources from 'public' folder
    if (pathname === '/' || pathname === '/index.html') {
        serveStaticFile(res, './public/index.html', 'text/html');
    } else if (pathname.match(/\.css$/)) {
        serveStaticFile(res, './public' + pathname, 'text/css');
    } else if (pathname.match(/\.js$/)) {
        serveStaticFile(res, './public' + pathname, 'application/javascript');
    } else if (pathname.match(/\.png$/)) {
        serveStaticFile(res, './public' + pathname, 'image/png');
    } else if (pathname.match(/\.jpg$/)) {
        serveStaticFile(res, './public' + pathname, 'image/jpeg');
    }

    // Handle GET request
    else if (pathname === '/get-data' && req.method === 'GET') {
        // For example: returning some sample data
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'GET request received!' }));
    }

    // Handle POST request
    else if (pathname === '/submit-data' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            // Process the POST data
            const postData = JSON.parse(body);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'POST request received!', data: postData }));
        });
    }

    // Handle 404 - Not Found
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
