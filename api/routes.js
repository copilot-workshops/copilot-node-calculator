module.exports = function (app) {
  const arithmetic = require('./controller');
  app.route('/arithmetic').get(arithmetic.calculate);
};
