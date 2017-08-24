var expect = require('chai').expect;
var YopAjax = require('./lib/yop-ajax');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

describe('yop-ajax', function() {

    var server;
    beforeEach(function(done) {
        server = require('http').createServer(function(request, response) {
            if (request.url == '/404') {
                response.setHeader('Content-Type', 'text/plain');
                response.writeHead(404);
            }
            else {
                response.setHeader('Content-Type', 'text/plain');
                response.write('hello');
            }
            response.end();
        });
        server.listen(5000, done);
    });
    afterEach(function() {
        server.close();
    });

    it('calls the given success callback with data', function(done) {
        var yopAjax = new YopAjax(new XMLHttpRequest());
        yopAjax.call('http://localhost:5000').then(function(data) {
            expect(data).to.equal('hello');
            done();
        });
    });

    it('shares received status', function(done) {
        var yopAjax = new YopAjax(new XMLHttpRequest());
        yopAjax.call('http://localhost:5000/404').then(function(data, status) {
            expect(status).to.equal(404);
            done();
        });
    });
});
