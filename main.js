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
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            db.query('INSERT INTO receipt SELECT * FROM instorage WHERE id=?', [post.id], function(error, result){
                db.query('DELETE FROM instorage WHERE id=?', [post.id], function(error, result){
                if(error){throw error;}
                response.writeHead(302, {Location: `/`});
                response.end();
                })
            })
        })
    }else { //없는페이지
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);