var express = require('express');
var path = require('path');
var app = express();

// app.use('/assets', express.static(path.join(__dirname, 'assets')));
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });

app.use(express.static(path.join(__dirname, 'dist')));
app.listen(8000, function () {
    console.log('UI server listening on port 8000!')
});
