import Joi from "joi";

export const validateRegister = (req, res, next) => {
  const data = req.body;
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    roles: Joi.string().valid("user", "admin").default("user"),
  });
  const { error } = schema.validate(data);
  if (error) {
    return res.status(400).send({
      data: null,
      success: false,
      error: error.details[0].message,
    });
  }

  next();
};

export const validateInput = (req, res, next) => {
  const data = req.body;
  const schema = Joi.object({
    content: Joi.string().required(),
  });
  const { error } = schema.validate(data);
  if (error) {
    return res.status(400).send({
      data: null,
      success: false,
      error: error.details[0].message,
    });
  }

  next();
};
