'use strict';

const {findNodeAt} = require('acorn/dist/walk');
const acorn = require('acorn');
const serializeNode = require('../../lib/serializeNode');
const test = require('tape');

function getTree(expression) {
  const isDoubleDash = (type, node) => type === 'Expression' &&
		node.type === 'CallExpression' &&
		node.callee.name === '__';

  const ast = acorn.parse(expression);
  const node = findNodeAt(ast, null, null, isDoubleDash);

  return node.node;
}

test('string literal', t => {
  const ast = getTree('__(\'foo\')');

  t.equal(serializeNode(ast.arguments[0]), 'foo');
  t.end();
});

test('string concatination', t => {
  const ast = getTree('__(\'foo\' + \'bar\')');

  t.equal(serializeNode(ast.arguments[0]), 'foobar');
  t.end();
});

test('string and variable concatination', t => {
  const ast = getTree('__(\'foo\' + myVar)');

  t.equal(serializeNode(ast.arguments[0]), 'foo{myVar}');
  t.end();
});

test('template literal', t => {
  const ast = getTree('var number = 5; __(`${number} days`)');

  t.equal(serializeNode(ast.arguments[0]), '{number} days');
  t.end();
});
