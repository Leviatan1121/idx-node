const server = require('./server/server.js');

const PORT = parseInt(process.env.PORT) || process.argv[3] || 8080;
server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});