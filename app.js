var express = require('express'),
  routes = require('./app/router.js'),
  app = express(),
  path = __dirname + '/app/dist/';

var port = 3000;

app.use(express.static(path));
app.use('/', routes);

app.listen(port, function () {
  console.log('App started on port ' + port);
});

module.exports = app;
