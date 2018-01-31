const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000
app.listen(PORT)

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
app.use('/public', express.static(__dirname + '/public'));
