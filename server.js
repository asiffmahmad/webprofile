import http from 'http';
import fs from 'fs';
import path from 'path';

const DB_FILE = './visits.json';
const PORT = 3001;

// Initialize the database file if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ count: 0 }));
}

const server = http.createServer((req, res) => {
    // Enable CORS for frontend connection
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Endpoint to Get Current Count
    if (req.url === '/api/visits' && req.method === 'GET') {
        try {
            const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ count: data.count }));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
        return;
    }

    // Endpoint to Increment Count
    if (req.url === '/api/visits/up' && req.method === 'GET') {
        try {
            const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
            data.count += 1;
            fs.writeFileSync(DB_FILE, JSON.stringify(data));
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ count: data.count }));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
        return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not Found" }));
});

server.listen(PORT, () => {
    console.log(`Node.js Counter Backend running at http://localhost:${PORT}`);
});
