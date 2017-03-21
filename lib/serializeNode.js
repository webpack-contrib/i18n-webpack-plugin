'use strict';

module.exports = serializeNode;

function serializeNode(node) {
	switch (node.type) {
	case 'BinaryExpression':
		if (node.operator !== '+') throw new Error('fail');
		return serializeNode(node.left) + serializeNode(node.right);

	case 'Identifier':
		return '{' + node.name + '}';

	case 'Literal':
		return node.value;

	case 'TemplateElement':
		return node.value.cooked;

	case 'TemplateLiteral':
		return node.quasis.reduce((str, templateElement, pos) => {
			if (typeof str !== 'string') return serializeNode(templateElement);
			return str + serializeNode(node.expressions[pos - 1]) + serializeNode(templateElement);
		}, null);

	default:
		console.log(JSON.stringify(node));
		throw new Error('unknown');
	}
}
