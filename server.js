let fs = require('fs')
let gun = require('gun')
let http = require('http')

let server = http.createServer(function(req, res){
  if (gun.serve(req, res)){ return } // filters gun requests
  fs.createReadStream(require('path').join(__dirname, req.url)).on('error',() => { // static files!
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(
    require('fs')
      .readFileSync(require('path')
      .join(__dirname, 'index.html')
    ));
  }).pipe(res);
});

server.listen(8000)