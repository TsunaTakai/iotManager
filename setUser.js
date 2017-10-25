var db = require('./sqlite3Connection');

module.exports = function(req, res, next) {
  var userId = req.session.user_id;
  if (userId) {
    var query = 'SELECT user_id, email FROM users WHERE user_id = ' + userId;
    db.serialize(function () {
      db.all(query, function(err, rows) {
          console.log(err);
        if (!err) {
          res.locals.user = rows.length? rows[0]: false;
        }
      });
    });
  }
  next();
};