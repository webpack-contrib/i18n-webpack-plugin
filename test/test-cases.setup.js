import { basename, dirname, join } from 'path';
import { readFile } from 'fs';
import webpack from 'webpack';
import I18nPlugin from '../src';

export function processFile(entry, ...pluginOpts) {
  const resolvedEntry = join(__dirname, 'test-cases', entry);
  const resolvedOutput = join(dirname(resolvedEntry), `${basename(resolvedEntry, '.code.js')}.tmp.js`);

  const compiler = webpack({
    entry: resolvedEntry,
    output: {
      filename: basename(resolvedOutput),
      path: dirname(resolvedOutput),

      libraryTarget: 'commonjs2',
    },
    plugins: [
      new I18nPlugin(...pluginOpts),
    ],
  });

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) return void reject(err);
      // stats.compilation.errors contains errors and warnings produced by plugin itself
      if (stats.compilation.errors.length) return void reject(stats.compilation.errors[0]);

      return void resolve(read(resolvedOutput).then((raw) => {
        return ({
          file: resolvedOutput,
          raw,
          stats,
        });
      }));
    });
  });
}

function read(filepath) {
  return new Promise((resolve, reject) => {
    readFile(filepath, 'utf8', (err, data) => {
      if (err) return void reject(err);

      return void resolve(data);
    });
  });
}

export function requireUncache(modulePath) {
  delete require.cache[require.resolve(modulePath)];
  return require(modulePath); // eslint-disable-line import/no-dynamic-require, global-require
}
