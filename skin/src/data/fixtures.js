'use strict';

var yaml = require('gulp-yaml');

function Fixtures(path) {
    this.path = path;
}

Fixtures.constructor = Fixtures;

Fixtures.prototype.load = function(name) {
    if (!(name in this.data)) {
        var data = yaml;
        this.data[name] = data;
        this.name = name;
    }
    return this;
};
