var express = require('express');
var router = express.Router();
var moment = require('moment'); //追加
var db = require('../sqlite3Connection');

router.get('/:deviceId', function(req, res, next) {
    var rdeviceId = req.params.deviceId;
    var getDeviceQuery  = 'SELECT * FROM config WHERE deviceId = ?';
    db.serialize(function () {
         db.all(getDeviceQuery, rdeviceId, function(err, rows) {
            console.error(err);
            console.log(rows.length);
            var deviceIdExists = rows.length == 0;
            if (deviceIdExists) {
                var param = {
                    "deviceId":"null",
                };
                res.header('Content-Type', 'application/json; charset=utf-8');
                res.send(param);                    
            } else {
                var param = {
                "deviceId":rows[0].deviceId,
                "iotHuBConnection":rows[0].iotHuBConnection,
                "k":rows[0].k,
                "fps":rows[0].fps, 
                "threshold":rows[0].threshold, 
                "faceKey":rows[0].faceKey, 
                "emotionKey":rows[0].emotionKey, 
                "groupId":rows[0].groupId, 
                "faceListId":rows[0].faceListId, 
                "liveStreamingPath":rows[0].liveStreamingPath,
                "backupPath":rows[0].backupPath
            };
                res.header('Content-Type', 'application/json; charset=utf-8');
                res.send(param);                    
           }
        });
    });
});

module.exports = router;