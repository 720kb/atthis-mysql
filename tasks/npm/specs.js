/*global require __dirname*/
(function specs(require, __dirname) {
  'use strict';

  var path = require('path')
    , glob = require('glob');

  glob('spec/**/*.js', function onGlob(err, files) {

    if (err) {

      throw err;
    }
    if (files &&
      files.length > 0) {

      var filesIndex = 0
        , filesLength = files.length
        , aResult
        , specFile
        , name;
      for (; filesIndex < filesLength; filesIndex += 1) {

        aResult = files[filesIndex];
        if (aResult) {

          specFile = path.resolve(__dirname, '../..', aResult);
          require(specFile);
          name = require.resolve(specFile);
          delete require.cache[name];
        }
      }
    }
  });
}(require, __dirname));
