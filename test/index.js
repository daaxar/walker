const Walker = require('../src');

const parsed = {
  // childNodes: [
  //   {
  //     tagName: 'body',
  //     nodeType: 1,
  //     childNodes: [
  //       {
  tagName: 'section',
  nodeType: 1,
  childNodes: [
    {
      tagName: 'h1',
      nodeType: 1,
      childNodes: [
        {
          nodeType: 3,
          rawText: 'Title',
        },
      ],
    },
    {
      tagName: 'strong',
      nodeType: 1,
      childNodes: [
        {
          nodeType: 3,
          rawText: 'This is a strong text',
        },
      ],
    },
  ],
  //       },
  //     ],
  //   },
  // ],
  // tagName: null,
  // nodeType: 1,
  // valid: true,
};

const walker = Walker([
  {
    condition: (node) => node.nodeType === 1,
    action: (node, container, next) => {
      if (node.tagName === 'h1') {
        const text = [];
        next(node.childNodes, text);
        container.push(`# ${text}`);
      } else if (node.tagName === 'strong') {
        const text = [];
        next(node.childNodes, text);
        container.push(`**${text}**`);
      } else {
        next(node.childNodes);
      }
    },
  },
  {
    condition: () => true,
    action: (node, container) => {
      container.push('node.rawText');
    },
  },
]);
const obj = walker(parsed, []);

// console.log(JSON.stringify(obj, null, 1));
console.log(obj.join('\n\n'));
