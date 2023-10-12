
const fs = require('fs');
const path = require('path');
const http = require('http');

const server = http.createServer((req, res) => {
    const dynamicpath = path.join(
        __dirname, 
        'content', 
        req.url === '/' ? 'index.html' : req.url);
    
    const dynamicext = path.extname(dynamicpath);
    
    let contentType = 'text/html';
    
    switch (dynamicext){
        case '.js':
            contentType = 'text/javascripts';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case 'jpg':
            contentType = 'image/jpg';
            break;
        case '.css':
            contentType = 'text/css';
    }
    fs.readFile(dynamicpath, (err, content) => {
        if (err){
            if (err.code === 'ENOENT'){
                fs.readFile(path.join(__dirname, 'content', '404.html'), (err, content) => {
                        res.writeHead(200, {'content_type': 'text/html'});
                        res.end(content) 
                });
            }
            else{
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        }
        else{
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content);
        }
    })
});


server.listen(5000, () => {console.log('Running Server')});