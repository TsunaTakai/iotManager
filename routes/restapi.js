var express = require('express');
var router = express.Router();
var moment = require('moment'); //追加
var db = require('../sqlite3Connection');
//var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database('./rasiot.sqlite3');

router.get('/:deviceId', function(req, res, next) {
    var rdeviceId = req.params.deviceId;
    var getDeviceQuery  = 'SELECT * FROM config WHERE deviceId = ?';
    var data = [];
    db.serialize(function () {
         db.each(getDeviceQuery, rdeviceId, function(err, row) {
             if (err){
                 throw err;
             }else{
                 data.push(row);
             }
         },function(err, count){
            if (err) {
                throw err;
            }else{
                if (count == 0){
                    var paramnull = {
                        "deviceId":"null",
                    };
                    res.header('Content-Type', 'application/json; charset=utf-8');
                    res.send(paramnull);                    
                }else{
                    var param = {
                        "deviceId":data[0].deviceId,
                        "locationX":data[0].locationX,
                        "locationY":data[0].locationY,
                        "iotHuBConnection":data[0].iotHuBConnection,
                        "k":data[0].k,
                        "minsize":data[0].minsize,
                        "fps":data[0].fps, 
                        "threshold":data[0].threshold, 
                        "faceKey":data[0].faceKey, 
                        "emotionKey":data[0].emotionKey, 
                        "groupId":data[0].groupId, 
                        "faceListId":data[0].faceListId, 
                        "liveStreamingPath":data[0].liveStreamingPath,
                        "backupPath":data[0].backupPath
                };
                res.header('Content-Type', 'application/json; charset=utf-8');
                res.send(param);                                
            }
         }
        });
    });
});

module.exports = router;