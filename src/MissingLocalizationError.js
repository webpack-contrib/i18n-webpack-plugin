/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/

class MissingLocalizationError extends Error {
  constructor(module, name, value) {
    super();

    Error.captureStackTrace(this, MissingLocalizationError);
    this.name = 'MissingLocalizationError';
    this.requests = [
      { name, value },
    ];
    this.module = module;
    // small workaround for babel
    Object.setPrototypeOf(this, MissingLocalizationError.prototype);
    this._buildMessage();
  }

  _buildMessage() {
    this.message = this.requests.map((request) => {
      if (request.name === request.value) {
        return `Missing localization: ${request.name}`;
      }
      return `Missing localization: (${request.name}) ${request.value}`;
    }).join('\n');
  }

  add(name, value) {
    for (let i = 0; i < this.requests.length; i++) {
      if (this.requests[i].name === name) return;
    }
    this.requests.push({ name, value });
    this._buildMessage();
  }
}

export default MissingLocalizationError;
