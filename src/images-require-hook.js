/**
 * Allows node to execute client code that imports
 * images using `require('./image.jpg') or import './image.jpg'`
 */

const md5File = require('md5-file');

module.exports = (extensions, assetsDir = '/assets') => {
  [].concat(extensions).forEach((extension) => {
    require.extensions[extension] = (module, filename) => {
      try {
        const hash = md5File.sync(filename);
        return module._compile(`module.exports = '${assetsDir}/${hash}${extension}'`, filename);
      } catch (err) {
        const dataUri = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
        return module._compile(`module.exports = '${dataUri}'`, filename);
      }
    };
  });
};
