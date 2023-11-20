const http = require('http')
const app = require('./src/app');

const port = parseInt(process.env.PORT) || 3001;
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}...`);
});