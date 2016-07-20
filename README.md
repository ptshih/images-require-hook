images-require-hook
===

A require hook to support importing images in universal javascript with Webpack.

This is similar to Babel's [babel/register](https://babeljs.io/docs/usage/require/).

This module was inspired by [css-modules-require-hook](https://github.com/css-modules/css-modules-require-hook) for supporting requiring and importing of stylesheets inside Javascript files.

## Why is this needed?

When building a universal/isomorphic Javascript app with Node and Webpack, Node's require system does not support importing images directly inside Javascript (like Webpack does with it's loaders.)

Example: `require('./image.png') or import './image.png'`

I wanted to be able to import both CSS and Images inline...

```
// component.jsx
const styles = import './component.scss'; // Works with `css-modules-require-hook`
const logo = import './logo.png'; // Works with Webpack but not Node
```

## How does it work?

This basically takes any `require/import` of an image file and `md5` hashes it's contents and copies it into the assets directory.

This module hooks into `require.extensions` for each extension specified and replaces all calls to `require/import` and returns a string with the hashed image file: `/assets/9c752eb5ac4e72fb52853e1caab31f64.jpg`

## How do I use it?

Make sure your Webpack config uses `file-loader` for all image extensions you want to use with this module. `url-loader` is **not** supported.

```
{
  test: /\.(png|jpg|jpeg|gif|svg)$/,
  loader: 'file',
}
```

Require this module like you do for `require('babel-core/register')` or at the very least before you require any `js` files that `require` or `import` an image.

#### Parameters

- The first param is extension(s).
- The second param is path to Webpack assets directory relative to project root.

#### Examples

`require('images-require-hook')('.jpg', '/webpack_assets_directory');`

or

`require('images-require-hook')(['jpg', 'jpeg', 'png', 'gif', 'svg'], '/webpack_assets_directory');`

Finally, to require or import images in your Javascript...

```
var logo = require('./logo.png'); // ES5
const logo = import './logo.png'; // ES6

// logo = '/assets/9c752eb5ac4e72fb52853e1caab31f64.jpg'

const logoImg = <img src={logo} alt="logo" />; // JSX

```

## What is supported?

- jpg/jpeg
- png
- gif
- svg

## Known Issues

- NOT COMPATIBLE with: https://github.com/tcoopman/image-webpack-loader
