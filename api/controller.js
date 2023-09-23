'use strict';

exports.calculate = function(req, res) {
  req.app.use(function(err, _req, res, next) {
    if (res.headersSent) {
      return next(err);
    }

    res.status(400);
    res.json({ error: err.message });
  });

  // TODO: Add operator
  /**
   * An object containing mathematical operations as functions.
   * @typedef {Object} Operations
   * @property {function} add - Adds two numbers.
   * @property {function} subtract - Subtracts two numbers.
   * @property {function} multiply - Multiplies two numbers.
   * @property {function} divide - Divides two numbers.
   * @property {function} power - Raises a number to a power.
   * @property {function} mod - Returns the remainder of a division operation.
   * @property {function} negate - Negates a number.
   */

  var operations = {
    'add':      function(a, b) { return Number(a) + Number(b) },
    'subtract': function(a, b) { return a - b },
    'multiply': function(a, b) { return a * b },
    'divide':   function(a, b) { return a / b },
    'power':    function(a, b) { return Math.pow(a, b) },
    'modulus':  function(a, b) { return a % b },
    'sqrt':     function(a) { return Math.sqrt(a) },
    'factorial':function(a) { return factorial(a) },
    'log':      function(a) { return Math.log(a) },
    'sin':      function(a) { return Math.sin(a) },
    'cos':      function(a) { return Math.cos(a) },
    'tan':      function(a) { return Math.tan(a) },
    'negate':   function(a) { return -a }
  };

  if (!req.query.operation) {
    throw new Error("Unspecified operation");
  }

  var operation = operations[req.query.operation];

  if (!operation) {
    throw new Error("Invalid operation: " + req.query.operation);
  }

  if (!req.query.operand1 ||
      !req.query.operand1.match(/^(-)?[0-9\.]+(e(-)?[0-9]+)?$/) ||
      req.query.operand1.replace(/[-0-9e]/g, '').length > 1) {
    throw new Error("Invalid operand1: " + req.query.operand1);
  }

  if (req.query.operand2 != null && (!req.query.operand2 ||
      !req.query.operand2.match(/^(-)?[0-9\.]+(e(-)?[0-9]+)?$/) ||
      req.query.operand2.replace(/[-0-9e]/g, '').length > 1)) {
    throw new Error("Invalid operand2: " + req.query.operand2);
  }

  res.json({ result: operation(req.query.operand1, req.query.operand2) });
};
