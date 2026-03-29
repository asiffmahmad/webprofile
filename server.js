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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
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

    // Endpoint to log visitor JSON data
    if (req.url === '/api/log' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const visitorData = JSON.parse(body);
                visitorData.timestamp = new Date().toISOString();

                const LOG_FILE = './visitor_logs.json';
                let logs = [];
                if (fs.existsSync(LOG_FILE)) {
                    logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
                }
                logs.push(visitorData);
                fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (error) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: "Failed to log data" }));
            }
        });
        return;
    }

    // Return 404 for uncharted paths after all specific route checks
    if (req.method !== 'OPTIONS' && req.method !== 'POST') {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Not Found" }));
    }
});

server.listen(PORT, () => {
    console.log(`Node.js Counter Backend running at http://localhost:${PORT}`);
});
