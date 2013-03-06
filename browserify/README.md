Install
-------
Use the old version because new one has not --debug option.

    sudo npm -g install browserify@1.9.0
    npm install

Create bundle
=============
    browserify index.js > index-bundle.js

Debug mode (for correct line numbers on console):

    browserify --debug index.js > index-bundle.js
