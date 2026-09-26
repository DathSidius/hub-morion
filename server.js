const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const url = req.url.split('?')[0];

    if (url === '/' || url === '/index.html') {
        try {
            const html = fs.readFileSync(path.join(__dirname, 'index.html'));
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'public, max-age=300'
            });
            return res.end(html);
        } catch (err) {
            res.writeHead(500);
            return res.end('Server error');
        }
    }

    if (url === '/health') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('OK');
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 — not found');
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Morion Hub running on port ${PORT}`);
});