//var db = require('./sqlite3Connection');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../rasiot.sqlite3');

module.exports = function(req, res, next) {
  var userId = req.session.user_id;
  if (userId) {
    var query = 'SELECT user_id, email FROM users WHERE user_id = ?';
    var data = [];
    db.serialize(function () {
      db.each(query, [userId], function(err, row) {
        if (!err) {
            data.push(row);
        }
      }, function(err, count) {
        if (!err) {
          if (count == 0) {
            res.locals.users = false;
          }else{
            res.locals.users = data[0];
          }
        }
      });
    });
  }
  next();
};