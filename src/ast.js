import { findNodeAt } from 'acorn/dist/walk';

export const base = {
  BinaryExpression(node, state, c) {
    if (node.operator !== '+') {
      c(node, `Unsupported BinaryExpression with operator ${node.operator}`, 'Unknown');
    }

    const value = c(node.left, 'BinaryExpression') + c(node.right, 'BinaryExpression');

    if (state === 'BinaryExpression') {
      return value;
    }

    return `'${value}'`;
  },
  ExpressionStatement(node, state, c) {
    return c(node.expression, state);
  },
  Identifier(node, state) {
    if (state === 'BinaryExpression' || state === 'TemplateLiteral') {
      return `{${node.name}}`;
    }

    return node.name;
  },
  Literal(node) {
    return node.value;
  },
  TemplateElement(node) {
    return node.value.raw;
  },
  TemplateLiteral(node, state, c) {
    const value = node.quasis.map((templateElement, pos) => {
      if (templateElement.tail) {
        return c(templateElement, null);
      }

      return c(templateElement, null) + c(node.expressions[pos], 'TemplateLiteral');
    }).join('');

    if (state === 'BinaryExpression' || state === 'TemplateLiteral') {
      return value;
    }

    return `'${value}'`;
  },
  Unknown(node, state) {
    const error = new Error(state || `Unknown type ${node.type}`);
    error.loc = { start: node.start, end: node.end };
    throw error;
  },
};

export function isPluralExpression(expr, pluralIdentifierName) {
  const result = findNodeAt(expr, null, null, (nodeType, node) =>
    nodeType === 'Identifier' && node.name === pluralIdentifierName);

  return Boolean(result);
}

export function serialize(node, state, visitor, override) {
  function c(node, st, override) {
    return (visitor[override || node.type] || visitor.Unknown)(node, st, c);
  }

  return c(node, state, override);
}

export function serializeExpression(expr) {
  return serialize(expr, null, base);
}
