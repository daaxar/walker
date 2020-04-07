const { getParams } = require('./getParams');

/**
 * Walker factory
 * @param {Array} rules
 */
const WalkerFactory = (rules) => {
  /**
   * Walker instances
   * @param {*} node
   * @param {*} container
   */
  const walkerInstance = (...args) => {
    const { node, container } = getParams(args);

    if (node instanceof Array) {
      for (let n = 0; n < node.length; n += 1) {
        walkerInstance(node[n], container);
      }
    } else if (typeof node === 'object') {
      // Find the first positive rule for this node.
      const rule = rules.find((r) => typeof r === 'function' || r.condition === undefined || r.condition(node)) || {};

      const action = (typeof r === 'function' ? rule : rule.action) || undefined;
      if (typeof action === 'function') {
        const next = walkerInstance.bind(null, undefined, container);

        action(node, container, next);
      }
    } else {
      return node;
    }
    return container;
  };

  return walkerInstance;
};

module.exports = WalkerFactory;
