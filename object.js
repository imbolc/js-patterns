/*jslint node: true */
'use strict';


function Hello(name) {
    this.name = name || 'World';
}

Hello.prototype = {
    say: function (name) {
        name = name || this.name;
        return 'Hello, ' + name + '!';
    }
};


var foo = new Hello();
console.log(foo.say());  // Hello, World!

var bar = new Hello('Bar');
console.log(bar.say());  // Hello, Bar!
console.log(bar.say('Baz'));  // Hello, Baz!
