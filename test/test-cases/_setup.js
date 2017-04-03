'use strict';

const {basename, dirname, resolve} = require('path');
const {readFile} = require('fs');
const I18nPlugin = require('../../index');
const webpack = require('webpack');

exports.processFile = processFile;
exports.requireUncache = requireUncache;

function processFile(entry, localization, opts) {
  const resolvedEntry = resolve(__dirname, entry);
  const resolvedOutput = resolve(dirname(resolvedEntry), basename(resolvedEntry, '.js') + '.tmp.js');

  const compiler = webpack({
    entry: resolvedEntry,
    output: {
      filename: basename(resolvedOutput),
      path: dirname(resolvedOutput),

      libraryTarget: 'commonjs2',
    },
    plugins: [
      new I18nPlugin(localization, opts),
    ],
  });

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) return void reject(err);
      if (stats.compilation.errors.length) return void reject(stats.compilation.errors[0]);
      resolve(read(resolvedOutput).then(raw => ({file: resolvedOutput, raw, stats})));
    });
  });
}

function read(filepath) {
  return new Promise((resolve, reject) => {
    readFile(filepath, 'utf8', (err, data) => {
      if (err) return void reject(err);
      resolve(data);
    });
  });
}

function requireUncache(modulePath) {
  delete require.cache[require.resolve(modulePath)];
  return require(modulePath);
}
