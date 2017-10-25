var express = require('express');
var router = express.Router();
var moment = require('moment');
var db = require('../sqlite3Connection');

/* GET home page. */
router.get('/', function(req, res, next) {
      var query = 'SELECT deviceId, strftime(\'%Y-%m-%d %H:%M:%S\', createdat) AS created_at FROM config';
      db.serialize(function () {
         db.all(query, function(err, rows) {
             console.log(rows);
             res.render('index', { title: 'デバイス登録', deviceList: rows });
         });          
      });  
});

router.post('/', function(req, res, next) {
    var deviceId = req.body.deviceId;
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    var query = 'INSERT INTO config (deviceId, createdAt) VALUES (?, ?)';
    db.serialize(function () {
      db.run(query, [deviceId, createdAt], function(err, rows) {
          console.log(err);
          res.redirect('/');
      });
    });
});

module.exports = router;
