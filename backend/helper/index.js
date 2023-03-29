exports.callErr = (message, code, next) => {
  const err = Error("Validation Error");
  err.errors = [message];
  err.status = code || 400;
  err.title = "Validation Error";
  return next(err);
};

exports.checkPassword = (oldP, newP) => {};
