var mod = (function () {
    "use strict";

    var private_var = 'hello world!';

    function private_method() {
        return private_var;
    }

    function public_method() {
        console.log(private_method());
    }

    return {
        public_method: public_method
    };

}());


mod.public_method();
