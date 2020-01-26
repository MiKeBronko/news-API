const errMessage = require('../variables/messages');

const centralErrors = ((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return next(err);
  }
  const { statusCode = 500, message } = err;
  return res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? errMessage[500] : message,
    });
});

module.exports = centralErrors;
