const express = require('express')
var instorage = require('./lib/instorage.js');
var bodyParser = require('body-parser');
const compression = require('compression');
const app = express()
const port = 3000

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.get('/', (request, response) => {
    instorage.home(request, response);
})
app.get('/page/:pageId', (request, response) => {
    if(request.params.pageId === '보관중'){
        tbname = 'instorage';
    }else if(request.params.pageId === '본인인도'){
        tbname = 'receipt';
    }
    else if(request.params.pageId === '타역이관'){
        tbname = 'ttas';
    }else if(request.params.pageId === '경찰서이관'){
        tbname = 'police';
    }else if(request.params.pageId === '삭제'){
        tbname = 'del';
    }
    instorage.page(request, response);
})
app.post('/create_process', (request, response) => {
    instorage.create_process(request, response);
})
app.get('/update/:pageId', (request, response) => {
    instorage.update(request, response);
})
app.post('/update_process', (request, response) => {
    instorage.update_process(request, response);
})
app.post('/delete_process', (request, response) => {
    instorage.delete_process(request, response);
})
app.post('/receipt_process', (request, response) => {
    instorage.receipt_process(request, response);
})
app.post('/ttas_process', (request, response) => {
    instorage.ttas_process(request, response);
})
app.post('/police_process', (request, response) => {
    instorage.police_process(request, response);
})
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})





/*var http = require('http');
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
});
app.listen(3000);*/