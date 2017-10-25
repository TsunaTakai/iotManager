var express = require('express');
var router = express.Router();
var moment = require('moment'); //追加
var db = require('../sqlite3Connection');

router.post('/:board_id', function(req, res, next) {
   var message = req.body.message;
    console.log(message);
   var boardId = req.params.board_id;
   var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
   var query = 'INSERT INTO messages (message, board_id, created_at) VALUES ($message, $boardId, $createdAt)';
    db.serialize(function () {
        db.run(query, {$message:message, $boardId:boardId, $createdAt:createdAt}, function(err, rows) {
        res.redirect('/boards/' + boardId);
        });
    });
});

router.get('/:board_id', function(req, res, next) {
    var boardId = req.params.board_id;
    var getBoardQuery = 'SELECT * FROM boards WHERE board_id = ?';
    var getMessageQuery = 'SELECT * FROM messages WHERE board_id = ?';
    db.serialize(function () {
         db.all(getBoardQuery, boardId, function(err, board) {
             db.all(getMessageQuery, boardId, function(err, messages) {
                 res.render('board', { title: board[0].title, board: board[0],messageList:messages });                 
             })
         });          
    });  
});

module.exports = router;