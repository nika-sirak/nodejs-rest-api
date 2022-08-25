const validationBody = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      error.message = "missing fields";
      error.status = 400;
      next(error);
    }
    next();
  };
};

module.exports = validationBody;
