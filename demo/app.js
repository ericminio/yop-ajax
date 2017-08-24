var fs = require('fs');
var path = require('path');

var file = function(name) {
    return fs.readFileSync(path.join(__dirname, name)).toString();
};

var server = require('http').createServer(function(request, response) {
    if (request.url == '/data.txt') {
        response.setHeader('Content-Type', 'text/plain; charset=utf-8');
        return response.end(file('data.txt'));
    }
    if (request.url == '/yop-ajax.js') {
        response.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        return response.end(file('../app/lib/yop-ajax.js'));
    }

    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.end(file('ajax.html'));
});
server.listen(5000, function() {
    console.log('listening on port 5000');
});
