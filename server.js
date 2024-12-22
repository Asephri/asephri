const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8000; // Use port 8000

// Create the server
const server = http.createServer((req, res) => {
    // Serve the index.html at the root URL
    if (req.url === '/') {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading index.html');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
    // Serve files from the 'assets' directory
    else if (req.url.startsWith('/assets')) {
        const filePath = path.join(__dirname, req.url);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
                return;
            }
            // Set content type based on file extension
            const extname = path.extname(filePath);
            let contentType = 'text/plain';
            if (extname === '.html') contentType = 'text/html';
            if (extname === '.css') contentType = 'text/css';
            if (extname === '.js') contentType = 'application/javascript';
            if (extname === '.jpg' || extname === '.jpeg') contentType = 'image/jpeg';
            if (extname === '.png') contentType = 'image/png';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    }
    // Serve files from the 'uploads' folder (for listing HTML files)
    else if (req.url === '/files') {
        const uploadDir = path.join(__dirname, 'assets', 'uploads');
        fs.readdir(uploadDir, (err, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Unable to read directory');
                return;
            }

            // Filter for only HTML files
            const htmlFiles = files.filter(file => file.endsWith('.html'));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(htmlFiles)); // Return the list of HTML files
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
