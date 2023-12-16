var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/temlplate.js');
var path = require('path');
var sanitizehtml = require('sanitize-html');
var mysql = require('mysql');
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Dmagmagma1234!',
    database:'osongLostSystem'
});
db.connect();

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
        if(queryData.id === undefined){ //홈페이지    
            db.query(`SELECT * FROM instorage`, function(error, inStorages){
                db.query(`SELECT COUNT (*) AS num FROM instorage`, function(error2, row){
                    db.query(`SELECT COUNT (*) AS num FROM instorage WHERE storage = '냉장고'`, function(error2, row1){
                        db.query(`SELECT COUNT (*) AS num FROM instorage WHERE storage = '금고'`, function(error2, row2){
                            db.query(`SELECT COUNT (*) AS num FROM instorage WHERE name IS NULL`, function(error2, row3){
                                var title = '보관중';
                                var description = template.list(inStorages);
                                var totalNum = row[0].num;
                                var refNum = row1[0].num;
                                var safeNum = row2[0].num;
                                var unknownNum = row3[0].num;
                                var form = `
                                    <form action="http://localhost:3000/create_process" method="post">
                                    <label>
                                        <input type="text" name="regis" placeholder="등록자">
                                        <ion-icon name="people-outline"></ion-icon>
                                    </label>
                                    <label>
                                        <input type="text" name="place" placeholder="습득장소">
                                        <ion-icon name="git-pull-request-outline"></ion-icon>
                                    </label>
                                    <label>
                                        <input type="text" name="lost" placeholder="유실물">
                                        <ion-icon name="help-circle-outline"></ion-icon>
                                    </label>
                                    <label>
                                        <input type="text" name="name" placeholder="이름">
                                        <ion-icon name="person-outline"></ion-icon>
                                    </label>
                                    <label>
                                        <input type="text" name="number" placeholder="번호">
                                        <ion-icon name="call-outline"></ion-icon>
                                    </label> 
                                    <label>
                                        <input type="text" name="storage" placeholder="보관장소">
                                        <ion-icon name="call-outline"></ion-icon>
                                    </label> 
                                    <input type="submit">
                                </form>
                                `;
                                var html = template.HTML(title, description, totalNum, refNum, safeNum, unknownNum, form);
                                response.writeHead(200);
                                response.end(html);
                            }) 
                        }) 
                    })
                }) 
            })    
        }else { //메뉴페이지
            var filteredId = path.parse(queryData.id).base;
            if(filteredId === '보관중'){
                tbname = 'instorage';
            }else if(filteredId === '본인인도'){
                tbname = 'receipt';
            }
            else if(filteredId === '타역이관'){
                tbname = 'ttas';
            }else if(filteredId === '경찰서이관'){
                tbname = 'police';
            }else if(filteredId === '삭제'){
                tbname = 'del';
            }
            db.query(`SELECT * FROM ${tbname}`, function(error, inStorages){
                if(error){throw error;}
                db.query(`SELECT COUNT (*) AS num FROM instorage`, function(error2, row){
                    db.query(`SELECT COUNT (*) AS num FROM instorage WHERE storage = '냉장고'`, function(error2, row1){
                        db.query(`SELECT COUNT (*) AS num FROM instorage WHERE storage = '금고'`, function(error2, row2){
                            db.query(`SELECT COUNT (*) AS num FROM instorage WHERE name IS NULL`, function(error2, row3){
                                var title = filteredId;
                                var description = template.list(inStorages);
                                var totalNum = row[0].num;
                                var refNum = row1[0].num;
                                var safeNum = row2[0].num;
                                var unknownNum = row3[0].num;
                                var form = `
                                    <form action="http://localhost:3000/create_process" method="post">
                                    <label>
                                        <input type="text" name="regis" placeholder="등록자">
                                        <ion-icon name="people-outline"></ion-icon>
                                    </label>
                                    <label>
                                        <input type="text" name="place" placeholder="습득장소">
                                        <ion-icon name="git-pull-request-outline"></ion-icon>
                                    </label>
                                    <label>
                                        <input type="text" name="lost" placeholder="유실물">
                                        <ion-icon name="help-circle-outline"></ion-icon>
                                    </label>
                                    <label>
                                        <input type="text" name="name" placeholder="이름">
                                        <ion-icon name="person-outline"></ion-icon>
                                    </label>
                                    <label>
                                        <input type="text" name="number" placeholder="번호">
                                        <ion-icon name="call-outline"></ion-icon>
                                    </label> 
                                    <label>
                                        <input type="text" name="storage" placeholder="보관장소">
                                        <ion-icon name="call-outline"></ion-icon>
                                    </label> 
                                    <input type="submit">
                                </form>
                                `;
                                var html = template.HTML(title, description, totalNum, refNum, safeNum, unknownNum, form);
                                response.writeHead(200);
                                response.end(html);
                            }) 
                        }) 
                    })
                })
            })
        }
    }else if(pathname === '/create_process'){
        var body = '';
        request.on('data', function(data){
            body += data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            db.query(`
                INSERT INTO instorage (date, registant, place, title, name, hp, storage)
                 VALUES(DATE_FORMAT(NOW(), '%Y-%m-%d'), ?, ?, ?, ?, ?, ?)`,
                [post.regis, post.place, post.lost, post.name, post.number, post.storage],
                function(error, result){
                    if(error){
                        throw error;
                    }
                    response.writeHead(302, {Location: `/`});
                    response.end();
                }
            )
        });
    }else if(pathname === '/update'){
        db.query(`SELECT * FROM instorage`, function(error, inStorages){
            if(error){throw error;}
            db.query(`SELECT COUNT (*) AS num FROM instorage`, function(error2, row){
                db.query(`SELECT COUNT (*) AS num FROM instorage WHERE storage = '냉장고'`, function(error2, row1){
                    db.query(`SELECT COUNT (*) AS num FROM instorage WHERE storage = '금고'`, function(error2, row2){
                        db.query(`SELECT COUNT (*) AS num FROM instorage WHERE name IS NULL`, function(error2, row3){
                            db.query(`SELECT * FROM instorage WHERE id=?`, [queryData.id], function(error2, inStorage){
                                var title = '보관중';
                                var description = template.list(inStorages);
                                var totalNum = row[0].num;
                                var refNum = row1[0].num;
                                var safeNum = row2[0].num;
                                var unknownNum = row3[0].num;
                                var form = `
                                    <form action="http://localhost:3000/update_process" method="post">
                                        <input type="hidden" name="id" value="${queryData.id}">
                                        <label>
                                            <input type="text" name="regis" placeholder="등록자" value="${inStorage[0].registant}">
                                            <ion-icon name="people-outline"></ion-icon>
                                        </label>
                                        <label>
                                            <input type="text" name="place" placeholder="습득장소" value="${inStorage[0].place}">
                                            <ion-icon name="git-pull-request-outline"></ion-icon>
                                        </label>
                                        <label>
                                            <input type="text" name="lost" placeholder="유실물" value="${inStorage[0].title}">
                                            <ion-icon name="help-circle-outline"></ion-icon>
                                        </label>
                                        <label>
                                            <input type="text" name="name" placeholder="이름" value="${inStorage[0].name}">
                                            <ion-icon name="person-outline"></ion-icon>
                                        </label>
                                        <label>
                                            <input type="text" name="number" placeholder="번호" value="${inStorage[0].hp}">
                                            <ion-icon name="call-outline"></ion-icon>
                                        </label> 
                                        <label>
                                            <input type="text" name="storage" placeholder="보관장소" value="${inStorage[0].storage}">
                                            <ion-icon name="call-outline"></ion-icon>
                                        </label> 
                                        <input type="submit">
                                    </form>
                                    `;
                                var html = template.HTML(title, description, totalNum, refNum, safeNum, unknownNum, form);
                                response.writeHead(200);
                                response.end(html);
                            })
                        }) 
                    }) 
                })
            })
        })
    }else if(pathname === '/update_process'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            db.query('UPDATE instorage SET registant=?, place=?, title=?, name=?, hp=?, storage=? WHERE id=?', 
            [post.regis, post.place, post.lost, post.name, post.number, post.storage, post.id],
            function(error, result){
                console.log(post.id);
                response.writeHead(302, {Location: `/`});
                response.end();
            })
        })
    }else if(pathname === '/delete_process'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            db.query('DELETE FROM instorage WHERE id=?', [post.id],
            function(error, result){
                if(error){throw error;}
                response.writeHead(302, {Location: `/`});
                response.end();
            })
        })
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