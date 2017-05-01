[![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![test][test]][test-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]

<div align="center">
  <!-- replace with accurate logo e.g from https://worldvectorlogo.com/ -->
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" vspace="" hspace="25"
      src="https://cdn.rawgit.com/webpack/media/e7485eb2/logo/icon.svg">
  </a>
  <h1>i18n Plugin</h1>
  <p>i18n (localization) plugin for Webpack.<p>
</div>

<h2 align="center">Install</h2>

```bash
npm i -D i18n-webpack-plugin
```

<h2 align="center">Usage</h2>

This plugin creates bundles with translations baked in. So you can serve the translated bundle to your clients.

see [webpack/webpack/examples/i18n](https://github.com/webpack/webpack/tree/master/examples/i18n).

<h2 align="center">Options</h2>

```
plugins: [
  ...
  new I18nPlugin(languageConfig, optionsObj)
],
```
 - `optionsObj.functionName`: the default value is `__`, you can change it to other function name.
 - `optionsObj.failOnMissing`: the default value is `false`, which will show a warning message, if the mapping text cannot be found. If set to `true`, the message will be an error message.
 - `optionsObj.hideMessage`: the default value is `false`, which will show the warning/error message. If set to `true`, the message will be hide.

<h2 align="center">Maintainers</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/166921?v=3&s=150">
        </br>
        <a href="https://github.com/bebraw">Juho Vepsäläinen</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/8420490?v=3&s=150">
        </br>
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/533616?v=3&s=150">
        </br>
        <a href="https://github.com/SpaceK33z">Kees Kluskens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/3408176?v=3&s=150">
        </br>
        <a href="https://github.com/TheLarkInn">Sean Larkin</a>
      </td>
    </tr>
  <tbody>
</table>

[npm]: https://img.shields.io/npm/v/i18n-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/i18n-webpack-plugin

[deps]: https://david-dm.org/webpack-contrib/i18n-webpack-plugin.svg
[deps-url]: https://david-dm.org/webpack-contrib/i18n-webpack-plugin

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack-contrib/i18n-webpack-plugin.svg
[test-url]: https://travis-ci.org/webpack-contrib/i18n-webpack-plugin

[cover]: https://codecov.io/gh/webpack-contrib/i18n-webpack-plugin/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/i18n-webpack-plugin
