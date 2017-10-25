var express = require('express');
var router = express.Router();
var db = require('../sqlite3Connection');

router.get('/', function(req, res, next) {
  if (req.session.user_id) {
    res.redirect('/');
  } else {
    res.render('login', {
      title: 'ログイン'
    });
  }
});

router.post('/', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var query = 'SELECT user_id FROM users WHERE email = ? AND password = ? LIMIT 1';
  db.serialize(function () {
  db.all(query, [email, password], function(err, rows) {
    var userIdExists = rows.length == 1;
    if (userIdExists) {
      req.session.user_id = rows[0].user_id;
      res.redirect('/');
    } else {
      res.render('login', {
        title: 'ログイン',
        noUser: 'メールアドレスとパスワードが一致するユーザーはいません'
      });
    }
  });
});
});

module.exports = router;