/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
class MissingLocalizationError extends Error {
  constructor(module, keyset, value) {
    super();

    this.name = 'MissingLocalizationError';
    this.origin = this.module = module;
    this.requests = [];

    this.add(keyset, value);

    Error.captureStackTrace(this, this.constructor);
  }

  add(keyset, value) {
    if (this.requests.some(request => request.keyset === keyset)) return;
    this.requests.push({keyset, value});
    this._buildMessage();
  }

  _buildMessage() {
    this.message = this.requests.map(({keyset, value}) => {
      if (!keyset || keyset === value) return 'Missing localization: ' + value;

      return 'Missing localization: (' + keyset + ') ' + value;
    }).join('\n');
  }
}

module.exports = MissingLocalizationError;
