var express = require('express');
var router = express.Router();
var moment = require('moment');
//var db = require('../sqlite3Connection');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./rasiot.sqlite3');

router.get('/', function(req, res, next) {
  res.render('register', {
    title: '新規デバイス登録'
  });
});

router.get('/:device_id', function(req, res, next) {
    var deviceId = req.params.device_id;
    var getDeviceQuery = 'SELECT * FROM config WHERE deviceId = ? LIMIT 1';
    var data = [];
    db.serialize(function () {
         db.each(getDeviceQuery, deviceId, function(err, config) {
             if (err || config == undefined){
                 throw err;
             }else{
                 data.push(config);
             }
         }, function (err, count) {
             if (err){
                 throw err;
             }else{
                 if (count == 0){

                 }else {
                    console.log(data);
                    res.render('register', { title: 'デバイス更新', configList: data});
                 }
             }
         });
    });
});

router.post('/', function(req, res, next) {
  var rdeviceId = req.body.deviceId;
  var rlocationX = req.body.locationX;
  var rlocationY = req.body.locationY;
  var riotHuBConnection = req.body.iotHuBConnection;
  var rk = req.body.k;
  var rminsize = req.body.minsize;
  var rfps = req.body.fps;
  var rthreshold = req.body.threshold;
  var rfaceKey = req.body.faceKey;
  var remotionKey = req.body.emotionKey;
  var rgroupId = req.body.groupId;
  var rfaceListId = req.body.faceListId;
  var rliveStreamingPath = req.body.liveStreamingPath;
  var rbackupPath = req.body.backupPath;
  var rcreatedAt = moment().format('YYYY-MM-DD HH:mm:ss');

  console.log(rdeviceId);
  var updateQuery = 'UPDATE config set locationX = ?, locationY = ?, iotHuBConnection = ?, k = ?, minsize = ?, fps = ?, threshold = ?, faceKey = ?, emotionKey = ?, groupId = ?, faceListId = ?, liveStreamingPath = ?, backupPath = ?, createdAt = ? WHERE deviceId = ?';
  db.serialize(function () {
        //var stmt = db.prepare(updateQuery);
        //stmt.run(riotHuBConnection, rk, rminsize, rfps, rthreshold, rfaceKey, remotionKey, rgroupId, rfaceListId, rliveStreamingPath, rbackupPath, rcreatedAt, rdeviceId);
        //stmt.finalize();
            db.run(updateQuery, 
                [rlocationX, rlocationY, riotHuBConnection, rk, rminsize, rfps, rthreshold, rfaceKey, remotionKey, rgroupId, rfaceListId, rliveStreamingPath, rbackupPath, rcreatedAt, rdeviceId], 
                function(err) {
                    if (err) {
                        res.render('register',{title:err});
                    }else{
                        res.redirect('/login');
                    }
                });
    });
}); 

module.exports = router;