var express = require('express');
var router = express.Router();
var moment = require('moment');
var db = require('../sqlite3Connection');

router.get('/', function(req, res, next) {
  res.render('register', {
    title: '新規デバイス登録'
  });
});

router.get('/:device_id', function(req, res, next) {
    var deviceId = req.params.device_id;
    var getDeviceQuery = 'SELECT * FROM config WHERE deviceId = ? LIMIT 1';
    db.serialize(function () {
         db.all(getDeviceQuery, deviceId, function(err, config) {
                 console.log(config[0].iotHuBConnection);
                 res.render('register', { title: 'デバイス更新', configList: config});                 
         });          
    });  
});

router.post('/', function(req, res, next) {
  var rdeviceId = req.body.deviceId;
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
  var deviceIdExitQuery = 'SELECT * FROM config WHERE deviceId = ? LIMIT 1';
  var registerQuery = 'INSERT INTO config (deviceId, iotHuBConnection, k, minsize, fps, threshold, faceKey, emotionKey, groupId, faceListId, liveStreamingPath, backupPath, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  var updateQuery = 'UPDATE config set iotHuBConnection = ?, k = ?, minsize = ?, fps = ?, threshold = ?, faceKey = ?, emotionKey = ?, groupId = ?, faceListId = ?, liveStreamingPath = ?, backupPath = ?, createdAt = ? WHERE deviceId = ?';
  db.serialize(function () {
      db.all(deviceIdExitQuery, rdeviceId, function(err, deviceId) {
        var deviceIdExists = deviceId.length == 1;
        console.log(deviceIdExists);
        if (deviceIdExists) {
            /*
            res.render('register', {
                title:'新規デバイス登録',
                deviceIdExists: '既に登録されているデバイスIdです'
            });
            */
            db.run(updateQuery, 
                [riotHuBConnection, rk, rminsize, rfps, rthreshold, rfaceKey, remotionKey, rgroupId, rfaceListId, rliveStreamingPath, rbackupPath, rcreatedAt, rdeviceId], 
                function(err, rows) {
                    console.error(err);
                    res.redirect('/login');
            });
        } else {
            db.run(registerQuery, 
                [rdeviceId, riotHuBConnection, rk, rminsize, rfps, rthreshold, rfaceKey, remotionKey, rgroupId, rfaceListId, rliveStreamingPath, rbackupPath, rcreatedAt], 
                function(err, rows) {
                    console.error(err);
                    res.redirect('/login');
            });
        }
      });
  });
}); 

module.exports = router;