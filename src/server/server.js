const http = require('http');
const api = require('./api.js');

const Files = require('./Files.js');
const publicFiles = new Files('../client/public');
const clientFiles = new Files('../client');
const routes = require('./routes.js');

const server = http.createServer((req, res) => {
    const URL = req.url || false;
    var file = { code: 200, type: 'application/json' };

    if (routes[URL]) {
        file = publicFiles.load(routes[URL]);
        file.content = insertScript(file.content);
    } else if (URL.startsWith('/api/')) {
        const response = api.request(URL);
        if (response.ok) file.content = response.data;
        else file = response;
    } else if (URL === '/server/reload') {
        file = clientFiles.load('/reload.js');
        console.log(file);
    } else {
        file = publicFiles.load(URL);
        file.content = insertScript(file.content);
    }

    res.writeHead(file.code, { 'Content-Type': file.type });
    res.end(file.content);
});

function insertScript(content) {
    const script = `<script src="server/reload"></script>`;
    return Buffer.from(content.toString('utf-8') + script, 'utf-8');
}

module.exports = server;