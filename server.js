require('./bin/www');

/*
var http = require("http");
var server = http.createServer(function(request, response) {
response.writeHead(200, {"Content-Type": "text/html"});
response.write("<!DOCTYPE html>");
response.write("<html>");
response.write("<head>");
response.write("<title>Hello World Page</title>");
response.write("</head>");
response.write("<body>");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('rasiot.sqlite3');
var data = [];
db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)");
  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();
  db.each("SELECT * FROM lorem", function(err, row) {
      data.push(row);
  }, function() {
        response.write(JSON.stringify(data));
        response.write("</body>");
        response.write("</html>");
        response.end();
    });
});
db.close();
});
server.listen(process.env.PORT || 1337); */