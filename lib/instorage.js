var db = require('./db');
var template = require('./temlplate.js');
var url = require('url');
var qs = require('querystring');

exports.home = function(request, response){
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
                        response.send(html);
                    }) 
                }) 
            })
        }) 
    })
}

exports.page = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM ${tbname}`, function(error, inStorages){
        if(error){throw error;}
        db.query(`SELECT COUNT (*) AS num FROM instorage`, function(error2, row){
            db.query(`SELECT COUNT (*) AS num FROM instorage WHERE storage = '냉장고'`, function(error2, row1){
                db.query(`SELECT COUNT (*) AS num FROM instorage WHERE storage = '금고'`, function(error2, row2){
                    db.query(`SELECT COUNT (*) AS num FROM instorage WHERE name IS NULL`, function(error2, row3){
                        var title = request.params.pageId;
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
                        response.send(html);
                    }) 
                }) 
            })
        })
    })
}

exports.create_process = function(request, response){
    var post = request.body;
    db.query(`
    INSERT INTO instorage (date, registant, place, title, name, hp, storage)
    VALUES(DATE_FORMAT(NOW(), '%Y-%m-%d'), ?, ?, ?, ?, ?, ?)`,
    [post.regis, post.place, post.lost, post.name, post.number, post.storage],
    function(error, result){
        if(error){
            throw error;
        }
        response.redirect(`/`);
        }
    )
}

exports.update = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM instorage`, function(error, inStorages){
        if(error){throw error;}
        db.query(`SELECT COUNT (*) AS num FROM instorage`, function(error2, row){
            db.query(`SELECT COUNT (*) AS num FROM instorage WHERE storage = '냉장고'`, function(error2, row1){
                db.query(`SELECT COUNT (*) AS num FROM instorage WHERE storage = '금고'`, function(error2, row2){
                    db.query(`SELECT COUNT (*) AS num FROM instorage WHERE name IS NULL`, function(error2, row3){
                        db.query(`SELECT * FROM instorage WHERE id=?`, [request.params.pageId], function(error2, inStorage){
                            var title = '보관중';
                            var description = template.list(inStorages);
                            var totalNum = row[0].num;
                            var refNum = row1[0].num;
                            var safeNum = row2[0].num;
                            var unknownNum = row3[0].num;
                            var form = `
                                <form action="http://localhost:3000/update_process" method="post">
                                    <input type="hidden" name="id" value="${request.params.pageId}">
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
                            response.send(html);
                        })
                    }) 
                }) 
            })
        })
    })
}

exports.update_process = function(request, response){
    var post = request.body;
    db.query('UPDATE instorage SET registant=?, place=?, title=?, name=?, hp=?, storage=? WHERE id=?', 
    [post.regis, post.place, post.lost, post.name, post.number, post.storage, post.id],
    function(error, result){
        response.redirect(`/`);
    })        
}

exports.delete_process = function(request, response){
    var post = request.body;
    db.query('INSERT INTO del SELECT * FROM instorage WHERE id=?', [post.id], function(error, result){
        db.query('DELETE FROM instorage WHERE id=?', [post.id], function(error, result){
            db.query('UPDATE del SET storage = "삭제" WHERE id=?', [post.id], function(error, result){
                if(error){throw error;}
                response.redirect(`/`);
            })
        })
    })
}

exports.receipt_process = function(request, response){
    var post = request.body;
    db.query('INSERT INTO receipt SELECT * FROM instorage WHERE id=?', [post.id], function(error, result){
        db.query('DELETE FROM instorage WHERE id=?', [post.id], function(error, result){
            db.query('UPDATE receipt SET storage = "본인인도" WHERE id=?', [post.id], function(error, result){
                if(error){throw error;}
                response.redirect(`/`);
            })
        })
    })
}

exports.ttas_process = function(request, response){
    var post = request.body;
    db.query('INSERT INTO ttas SELECT * FROM instorage WHERE id=?', [post.id], function(error, result){
        db.query('DELETE FROM instorage WHERE id=?', [post.id], function(error, result){
            db.query('UPDATE ttas SET storage = "타역이관" WHERE id=?', [post.id], function(error, result){
                if(error){throw error;}
                response.redirect(`/`);
            })
        })
    })
}

exports.police_process = function(request, response){
    var post = request.body;
    db.query('INSERT INTO police SELECT * FROM instorage WHERE id=?', [post.id], function(error, result){
        db.query('DELETE FROM instorage WHERE id=?', [post.id], function(error, result){
            db.query('UPDATE police SET storage = "경찰서이관" WHERE id=?', [post.id], function(error, result){
                if(error){throw error;}
                response.redirect(`/`);
            })
        })
    })
}