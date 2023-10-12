
// const Logger = require('./logger');
// var logger = new Logger();

// logger.on('Logged', (arg) => {
//     console.log('This is message to be displayed as listener response', arg);
// })
// logger.log('Jeph')
// logger.log('and this is the message to be displayed as the response of log function we created');


const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer((req, res)=>{
    // if(req.url === '/'){
    //     res.write('Hello Jeph');
    //     res.end();
    // }
    // if(req.url === '/home'){
    //     fs.readFile(path.join(__dirname, 'content', 'index.html'), (err, content) => {
    //         if (err) throw err;
    //         res.end(content);
    //     })
    // }
    // if(req.url === '/jeph/names'){
    //     res.write(JSON.stringify([1, 3,90]));
    //     res.end();
    // }

    // when you want to load/read the different files dynamically

let filepath = path.join(
    __dirname,
    'content',
    req.url === '/' ? 'index.html' : req.url
);

let extename = path.extname(filepath);

// lets set the initial contentType

let contentType = 'text/html';

switch (extename){
    case '.js':
        contentType = 'text/javascripts';
        break;
    case '.css':
        contentType = 'text/css';
        break;
    case '.json':
        contentType = 'application/json';
        break;
    case '.png':
        contentType = 'image/png';
        break;
    case '.jpg':
        contentType = 'image/jpg';
        break;
}

fs.readFile(filepath, (err, content) => {
    if (err){
        if (err.code == 'ENOENT'){
            fs.readFile(path.join(__dirname, 'content', '404.html'), (err, content) => {
                res.writeHead(200, {'Conten-Type': 'text/html'});
                res.end(content);
            })
        }
        else{
            res.writeHead(500);
            res.end(`server errorerrr: ${err.code}`);
        }
    }else{
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content)  
    }
})

});

server.listen(4000, () => console.log('Listening to the port  4000....'));



