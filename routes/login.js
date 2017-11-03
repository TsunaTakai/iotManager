var express = require('express');
var router = express.Router();
var db = require('../sqlite3Connection');
//var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database('./rasiot.sqlite3');

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
  var query = 'SELECT user_id FROM users WHERE email = ? AND password = ?';
  var data = [];
  db.serialize(function () {
    db.each(query, [email, password], function(err, row) {
      if (err){
        throw err;
      }else{
        console.log(row)
        data.push(row);
      }
    }, function(err, count) {
      if (err) {
        throw err;
      }else{
        if (count == 0) {
            res.render('login', {
            title: 'ログイン',
            noUser: 'メールアドレスとパスワードが一致するユーザーはいません'
            });
        }else{
            req.session.user_id = data[0].user_id;
            res.redirect('/');
        }
      }
    });
  });
});

module.exports = router;