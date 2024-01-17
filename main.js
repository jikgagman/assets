var http = require('http');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/temlplate.js');
var db = require('./lib/db');
var instorage = require('./lib/instorage.js');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
        if(queryData.id === undefined){ //홈페이지    
            instorage.home(request, response);
        }else { //메뉴페이지
            if(queryData.id === '보관중'){
                tbname = 'instorage';
            }else if(queryData.id === '본인인도'){
                tbname = 'receipt';
            }
            else if(queryData.id === '타역이관'){
                tbname = 'ttas';
            }else if(queryData.id === '경찰서이관'){
                tbname = 'police';
            }else if(queryData.id === '삭제'){
                tbname = 'del';
            }
            instorage.page(request, response);
        }
    }else if(pathname === '/create_process'){
        instorage.create_process(request, response);
    }else if(pathname === '/update'){
        instorage.update(request, response);
    }else if(pathname === '/update_process'){
        instorage.update_process(request, response);
    }else if(pathname === '/delete_process'){
        instorage.delete_process(request, response);
    }else if(pathname === '/receipt_process'){
        instorage.receipt_process(request, response);
    }else if(pathname === '/ttas_process'){
        instorage.ttas_process(request, response);
    }else if(pathname === '/police_process'){
        instorage.police_process(request, response);
    }else { //없는페이지
        response.writeHead(404);
        response.end('Not found');
    }
    if (request.url === 'style.css'){
        fs.readFile('style.css', 'utf8', (err, data) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Not Found');
            return res.end();
          }
          res.writeHead(200, { 'Content-Type': 'text/css' });
          res.write(data);
          return res.end();
        });
      }
});
app.listen(3000);