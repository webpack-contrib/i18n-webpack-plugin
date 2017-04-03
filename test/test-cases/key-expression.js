'use strict';

const basket = 'корзине';
const count = '1';
const param1 = 'p1';
const param2 = 'p2';

exports.dynamicKeyFn = count => __(`there are ${count} apples in a ${basket}`);
exports.dynamicTemplateKey = __(`there are ${count} apples in a ${basket}`);
exports.parametrizedTemplateKey = __(`a template sample with ${param1} and ${param2}`);
exports.staticKey = __('static key');
