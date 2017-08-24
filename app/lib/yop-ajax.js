var YopAjax = function(xhr) { this.xhr = xhr; };

YopAjax.prototype.call = function(url) {
    var self = this;
    this.xhr.open('GET', url, true);
    this.xhr.onload = function() {
        self.callback(self.xhr.responseText, self.xhr.status);
    };
    this.xhr.send();
    return this;
};
YopAjax.prototype.then = function(callback) {
    this.callback = callback;
};

(function() {
    if (typeof module == 'object') {
        module.exports = YopAjax;
    }
})();
