images-require-hook
===

A require hook to support importing images in universal javascript with Webpack.

This is similar to Babel's [babel/register](https://babeljs.io/docs/usage/require/).

This module was inspired by [css-modules-require-hook](https://github.com/css-modules/css-modules-require-hook) for supporting requiring and importing of stylesheets inside Javascript files.

## Why is this needed?

When building a universal/isomorphic Javascript app with Node and Webpack, Node's require system does not support importing images directly inside Javascript (like Webpack does with it's loaders.

Like such: `require('./image.png') or import './image.png'`

I wanted to be able to import both CSS and Images inline...

```
// component.jsx
const styles = import './component.scss';
const logo = import './logo.png';
```

## How does it work?

Here is an example Webpack file-loader config for images:

```
{
  test: /\.(png|jpg|jpeg|gif)$/,
  loader: 'file',
}
```

This basically takes any `require/import` of an image file and md5 hashes it's contents and copies it into the assets directory.

This module hooks into `require.extensions` for each extension specified and replaces all calls to `require/import` and returns a string with the hashed image file: `/assets/9c752eb5ac4e72fb52853e1caab31f64.jpg`



## How do I use it?

Make sure your Webpack config uses `file-loader` (see above) for all image extensions you want to use with this module. `url-loader` is **not** supported.

Require this module before you include `require('babel-core/register')` or at least before you require any `js` files that require/import an image.

`require('images-require-hook')('.jpg', '/webpack_assets_directory');`

or

`require('images-require-hook')(['jpg', 'jpeg', 'png', 'gif', 'svg'], '/webpack_assets_directory');`

Finally, to import images in your Javascript...

```
const logo = import './logo.png';

// logo = '/assets/9c752eb5ac4e72fb52853e1caab31f64.jpg'

<img src={logo} alt="logo" />

```

## What is supported?

- jpg/jpeg
- png
- gif
- svg
