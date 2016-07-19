'use strict';

/**
 * Allows node to execute client code that imports
 * images using `require('./image.jpg') or import './image.jpg'`
 */

var md5File = require('md5-file');

module.exports = function (extensions) {
  var assetsDir = arguments.length <= 1 || arguments[1] === undefined ? '/assets' : arguments[1];

  [].concat(extensions).forEach(function (extension) {
    require.extensions[extension] = function (module, filename) {
      try {
        var hash = md5File.sync(filename);
        return module._compile('module.exports = \'' + assetsDir + '/' + hash + extension + '\'', filename);
      } catch (err) {
        var dataUri = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
        return module._compile('module.exports = \'' + dataUri + '\'', filename);
      }
    };
  });
};