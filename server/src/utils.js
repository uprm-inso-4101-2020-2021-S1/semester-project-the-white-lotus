let utils = {};

utils.to = (p) => {
  return p.then((res) => {
    return [null, res];
  }).catch((err) => {
    return [err];
  });
};

module.exports = utils;
