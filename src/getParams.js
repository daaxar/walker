const getParams = (args) => {
  // Auxiliary arguments are used to allow default parameters
  //   (overriding those of the binded function).
  const node = args[2] || args[0];
  const container = args[3] || args[1];
  return { node, container };
};

exports.getParams = getParams;
