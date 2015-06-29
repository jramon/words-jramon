var express = require('express');
var words = require('./words');
var app = express({ "env": "development" });

app.enable("jsonp callback");

app.get('/words/:query'+'.json', function (req, res) {
  var query = words(req.params.query);

  if (query.isValid) {
    var data = query.findWords();

    res.jsonp({ status: "success", data: data });
  } else {
    res.status(400).json({ message: query.messages[400] });
  }
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});
