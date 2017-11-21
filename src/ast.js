export const base = {
  BinaryExpression(node, state, c) {
    if (node.operator === '+') {
      return c(node.left, state) + c(node.right, state);
    }

    return c(node, state, 'Unsupported');
  },
  ExpressionStatement(node, state, c) {
    return c(node.expression, state);
  },
  Identifier(node, state) {
    const name = node.name;
    const param = `{${node.name}}`;

    if (name === state.pluralIdentName) state.plural = true;
    state.identifiers[name] = param;
    state.params = true;
    return param;
  },
  Literal(node) {
    return node.value;
  },
  TemplateElement(node) {
    return node.value.raw;
  },
  TemplateLiteral(node, state, c) {
    return node.quasis.map((templateElement, pos) => {
      if (templateElement.tail) {
        return c(templateElement, state);
      }

      return c(templateElement, state) + c(node.expressions[pos], state);
    }).join('');
  },
  Unsupported(node, state) {
    state.supported = false;
  },
};

/**
 *
 * @param  {object} expr
 * @param  {object} state
 * @param  {object} visitor
 * @param  {string} override
 * @return {mixed}
 */
export function serialize(expr, state, visitor, override) {
  function c(node, st, override) {
    return (visitor[override || node.type] || visitor.Unsupported)(node, st, c);
  }

  return c(expr, state, override);
}

/**
 *
 * @param  {object} expr            Fragment of AST
 * @param  {string} pluralIdentName
 * @return {object}
 */
export function serializeExpression(expr, pluralIdentName) {
  const state = {
    identifiers: {},
    params: false,
    plural: false,
    pluralIdentName,
    string: '',
    supported: true,
  };

  const string = serialize(expr, state, base);
  if (state.supported) state.string = string;
  return state;
}
