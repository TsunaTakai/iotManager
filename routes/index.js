var express = require('express');
var router = express.Router();
var moment = require('moment');
var db = require('../sqlite3Connection');
//var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database('./rasiot.sqlite3');

/* GET home page. */
router.get('/', function(req, res, next) {
      var query = 'SELECT deviceId, strftime(\'%Y-%m-%d %H:%M:%S\', createdat) AS created_at FROM config Order by deviceId';
      var data = [];
      db.serialize(function () {
         db.each(query, function(err, rows) {
             if (err || rows === undefined ) {
                res.render('index', { title: 'デバイス登録err' });
             }else{
                 console.log(rows);
                 data.push(rows);
             }
         }, function (err, count) {
             if (err) {
                 throw err;
             }else{
                 if (count===0){
                    res.render('index', { title: 'デバイス登録0' });
                 }else{
                     res.render('index', { title: 'デバイス登録x', deviceList: data });
                 }
             }
             });
         });          
});

router.post('/', function(req, res, next) {
    var deviceId = req.body.deviceId;
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    var query = 'INSERT INTO config (deviceId, createdAt) VALUES (?, ?)';
    db.serialize(function () {
      db.run(query, [deviceId, createdAt], function(err, rows) {
         if (err) {
             res.render('/',{title:err});
         }else{
             res.redirect('/');
         }
      });
    });
});

module.exports = router;
