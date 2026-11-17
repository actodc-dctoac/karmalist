const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

  // Get requested file
  let filePath = path.join(
    __dirname,
    'public',
    req.url === '/' ? 'home.html' : req.url
  );

  // Get file extension
  const ext = path.extname(filePath).toLowerCase();

  // Set content type
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };

  const contentType = contentTypes[ext] || 'application/octet-stream';

  // Read requested file
  fs.readFile(filePath, (err, content) => {

    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.end('404 - File Not Found');
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType
    });

    res.end(content);
  });

});

server.listen(3016, () => {
  console.log('Server running at http://localhost:3016');
});
