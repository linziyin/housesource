const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";

module.exports.initdatabase= function(){
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("数据库已连接!");
    global.Mdb=db.db('mydb1')
    });
}

module.exports.getDatabase=function(){
    return global.Mdb;
}
