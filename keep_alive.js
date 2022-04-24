var http = require('http');

http.createServer(function (req, res) {
  res.write("rushiaqa was working!");
  res.end();
}).listen(1080);